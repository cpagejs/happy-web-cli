import Cpage,  { Component } from 'cpage';
const html = require('./header.html');

export default class Header extends Component {
    constructor(){
        super();
        this.name = 'header';
        this.templateUrl = html;
    }

    handelC(event){
        this.$event.trigger('header-event', 'header');
    }

    beforeRender(){
        console.log('Header beforeRender')
    }

    render(){
        
    }
}