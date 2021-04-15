import { toast } from 'react-toastify';
import axios from 'axios'

export class Interceptor {
    static interceptRequest(self: any) {
        axios.interceptors.request.use(function (config) {
            self.setState({ loaderVisible: true })
            return config;
        }, function (error) {
            return Promise.reject(error);
        })
    }

    static interceptResponse(self: any) {
        axios.interceptors.response.use(
            response => {
                console.log('Intercepted response-->', response)
                self.setState({ loaderVisible: false })
                return response;
            },
            error => {
                console.log('Intercepted error-->', error.response)
                const status = error?.response?.status;
                const data = error?.response?.data;
                let _server_messages = null;
                try {
                    let { exc } = data;
                    // console.log(exc)
                    exc = JSON.parse(exc ?? null) ?? ['No exc']
                    console.log(exc[0])

                    _server_messages = data?._server_messages ?? null;
                    _server_messages = JSON.parse(_server_messages)
                    if (_server_messages?.length > 0) {
                        _server_messages = JSON.parse(_server_messages[0])
                        _server_messages = _server_messages.message;
                    }
                } catch (err) {
                    console.error('Parsing error in _server_messages:', err)
                }
                self.setState({ loaderVisible: false })
                toast.dismiss()
                switch (status) {
                    case 401:
                        toast.error(data['message']);
                        break;
                    case 403:
                        toast.error("Forbidden!");
                        // this.props.history.push('/login');
                        break;
                    case 404:
                        toast.error("Resource Not Found!")
                        break;
                    case 417:
                        toast.error(_server_messages)
                        break;
                    case 500:
                        toast.error("Internal Server Error!")
                        break;
                    case 502:
                        toast.error("Bad Gateway!")
                        break;
                    case 503:
                        toast.error("Service Temporarily Unavailable!")
                        break;
                    default:
                        toast.error("Something went wrong. Please contact support.")
                        return Promise.reject(error);
                }
            }
        );
    }
}