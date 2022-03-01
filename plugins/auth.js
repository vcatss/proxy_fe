export default async function ({ app, store }) {
    const auth = app.$auth;
    if (app.$auth.loggedIn) {
        return
    }
}