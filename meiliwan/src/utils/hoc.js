import React from 'react'
// 作用：往组件传递属性，提取公共部分
export function withUser(InnerComponent) {
    class OutComponent extends React.Component {
        constructor() {
            super();
            this.state = {
                userInfo: {}
            }
        }
        componentDidMount() {
            console.log("OutComponent,", this.props)
            let userInfo
            try {
                userInfo = localStorage.getItem('userInfo');
                userInfo = JSON.parse(userInfo)
            } catch (err) {
                userInfo = {}
            }
            this.setState({
                userInfo
            })
        }
        render() {
            const { userInfo } = this.state;
            return <InnerComponent {...this.state} {...this.props}>
                {/* 防止app里面有其他内容 这个也是props的*/}
                {/* {this.props.children} */}
            </InnerComponent>
        }
    }
    return OutComponent
}

// 反向继承
// 作用：拦截，如：用户登录后可访问
export function withLogin(InnerComponent) {
    class OutComponent extends InnerComponent {
        constructor() {
            super();
            // 如果InnerComponent有state传入，此处的state写法会把他覆盖
            // this.state={
            //     login:false
            // }
            // 正确写法：
            if (!this.state) {
                this.state = {}
            }
            this.state.login = false;
        }
        componentDidMount() {
            let userInfo = localStorage.getItem('userInfo')
            console.log("userinfo", userInfo)
            if (userInfo) {
                console.log(22222222)
                this.setState({
                    login: true
                })
            }
            console.log('userInfo',userInfo)
            // 这里要继承父类的方法，不然不会执行
            // super.componentDidMount();

        }
        render() {
            const { login } = this.state;
            console.log()
            if (login) {
                return super.render()
            }
            // return <div>你没有登录</div>
            return super.render()
        }
    }
    return OutComponent;
}