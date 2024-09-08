// import { request, response } from "express";
// import passport from "passport";

// export const passportCall = (strategy) => {
//   return async (req = request, res = response, next) => {
//     passport.authenticate(strategy, (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
//       console.log("el user", user);
//       console.log("esta es la info", info);
//       if (!user) {
//         return res
//           .status(401)
//           .json({
//             status: "error",
//             msg: info.message ? info.message : info.toString(),
//           });
//       }
//       req.user = user;
//       next();
//     })(req, res, next);
//   };
// };
import passport from "passport";

export const passportCall = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          status: "error",
          msg: info?.message || "Credenciales no válidas",
        });
      }
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password;
      req.user = userWithoutPassword;
      next();
    })(req, res, next);
  };
};
