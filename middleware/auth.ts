export default function isAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).redirect("/login");
  }
}
