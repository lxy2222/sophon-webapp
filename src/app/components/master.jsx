import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import {
    AppCanvas,
    AppBar,
    Avatar,
    Divider,
    FlatButton,
    LeftNav,
    List,
    ListItem,
} from 'material-ui'


class Master extends React.Component {

    propTypes: {
        children: React.PropTypes.node,
        history: React.PropTypes.object,
        location: React.PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {leftNavOpen: false}
    }

    render() {
        if (this.props.location.pathname === '/login') {
            return (
                <AppCanvas>
                    {this.props.children}
                </AppCanvas>
            )
        }
        else {
            return (
                <AppCanvas>
                    {this._getAppBar()}
                    <div style={{position: 'absolute', top: 80, left: 40, right: 40, bottom: 20}}>
                        {this.props.children}
                    </div>
                    {this._getLeftNav()}
                </AppCanvas>
            )
        }
    }

    _getAppBar() {
        let routes2subtitle = {
            "//": "",
            "/server/": " - Server Status",
            "/ssh_permission/": " - SSH Permission",
            "/deploy/": " - Deploy",
            "/dockers_status/": " - Docker Status",
        }
        let titleArray = this.props.location.pathname.split('/')
        let titleCut = [titleArray[0], titleArray[1], ""].join('/')
        let title = 'Sophon' + routes2subtitle[titleCut]

        return (
            <div>
                <AppBar title={title}
                 iconElementRight={this._getUserStatus()} 
                 style={{position: 'absolute', top: 0}}
                 onLeftIconButtonTouchTap={this.handleLeftNavToggle} />
            </div>
        )
    }

    _logout() {
        $.get("/api/user/logout", function() {
            window.location = "/#/login"
        })
    }

    _getUserStatus() {
        return (
            <FlatButton label="Logout" 
             onTouchTap={this._logout} />
        )
    }

    _getLeftNav() {
        return (
            <LeftNav
                ref="leftNav"
                docked={false} 
                open={this.state.leftNavOpen}
                onRequestChange={this.handleLeftNavClose}>
                <List>
                    <ListItem href="/#/" value="index" primaryText="Sophon" onTouchTap={this.handleLeftNavClose}/>
                    <Divider inset={false} />
                    <ListItem href="/#/server" value="server" primaryText="Server" onTouchTap={this.handleLeftNavClose}/>
                    <ListItem href="/#/ssh_permission" value="ssh-permission" primaryText="SSH Permission" onTouchTap={this.handleLeftNavClose}/>
                    <ListItem href="/#/deploy" value="deploy" primaryText="Deploy" onTouchTap={this.handleLeftNavClose}/>
                    <ListItem href="/#/dockers_status" value="docker" primaryText="Docker Status" onTouchTap={this.handleLeftNavClose}/>
                </List>
            </LeftNav>
        )
    }

    handleLeftNavToggle = () => this.setState({leftNavOpen: !this.state.leftNavOpen})

    handleLeftNavClose = () => this.setState({leftNavOpen: false})
}

export default Master
