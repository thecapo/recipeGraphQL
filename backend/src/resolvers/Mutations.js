const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../mail");
const { hasPermission } = require("../utils");
// const stripe = require('../stripe');

const Mutations = {
  async createRecipe(parent, args, ctx, info) {
    const recipe = await ctx.db.mutation.createRecipe(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            },
          },
          ...args
        }
      },
      info
    );
    return recipe;
  },

  updateRecipe(parent, args, ctx, info) { 
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateRecipe(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteRecipe(parent, args, ctx, info) {
    const where = { id: args.id };
    const recipe = await ctx.db.query.recipe({ where }, `{ id title user { id }}`);
    const ownRecipe = recipe.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN', 'RECIPEDELETE'].includes(permission))
    
    if (!ownRecipe && !hasPermissions) {
      throw new Error('You do not have permission to delete.');
    }
    return ctx.db.mutation.deleteRecipe({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },

  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Successfully Signed Out" };
  },
  
  async updatePermissions(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        },
      },
      info
    );
    // from utils hasPermission
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
    return ctx.db.mutation.updateUser({
      data: {
        permissions: {
          set: args.permissions
        },
      },
        where: {
          id: args.userId
        },
      },
      info
    );
  },

  async requestReset(parent, args, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: args.email } })
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`)
    }
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    })
    // its backend use localhost:4444
    // console.log(res)
    // return {message: 'thanks'}
    console.log(user.email)
    const mailRes = await transport.sendMail({
      from: 'carlo@carlo.com',
      to: user.email,
      subject: 'Password reset token.',
      html: makeANiceEmail(`Your Password Reset Token is here. \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`)
    })
    return { message: 'Thanks' }
  },

  async resetPassword(parent, args, ctx, info) {
    if (args.password !== args.confirmPassword) {
      throw new Error('Password does not match!')
    }
    //takes the first user in the users array
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    console.log([user])
    if (!user) {
      throw new Error('Token is either invalid or expired')
    }
    const password = await bcrypt.hash(args.password, 10);
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    })
    return updatedUser;
  }
};

module.exports = Mutations;
