function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave => permissionsNeeded.includes(permissionTheyHave));
  if (!matchedPermissions.length) {
    throw new Error(`Not enough permissions : ${permissionsNeeded}
    
    You have:

    ${user.permissions}
    
    `);
  }
}

exports.hasPermission = hasPermission;