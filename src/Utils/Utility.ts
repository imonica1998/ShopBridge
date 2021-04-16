import { navigationRef } from "../index";
const Utility = {
    getCookie(cname: string) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    navigateToScreen(screenName: string, self:any,props: any) {
        console.log('navref', navigationRef);
        self.props.history.push(screenName, props)
    },

}

export default Utility;