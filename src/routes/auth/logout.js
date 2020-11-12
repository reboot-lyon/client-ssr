export async function del(req, res, next) {
    const user = false;
    req.session.user = user;
    res.end(JSON.stringify({
        user: user
    }));
}