function UserInfo() {

    let u = ''
    let u_t = ''
    let p_u_t = ''

    let user = ''
    let pass = ''

    this.set_users = (users) => {
        u = users;
    }

    this.get_users = () => {
        return u
    }

    this.set_previous_user_type = () => {
        p_u_t = u_t
    }

    this.get_previous_user_type= () => {
        return p_u_t
    }

    this.set_user_type = (user_type) => {
        u_t = user_type
        this.set_current_user()
        this.set_current_pass()
    }

    this.get_user_type = () => {
        return u_t
    }

    this.set_current_user = () => {
        user = u[u_t]['user'];
    }

    this.get_current_user = () => {
        return user
    }

    this.set_current_pass = () => {
        pass = u[u_t]['pass'];
    }

    this.get_current_pass = () => {
        return pass
    }

}

window.user_info = new UserInfo();