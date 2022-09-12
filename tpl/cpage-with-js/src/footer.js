import Cpage,  { Component } from 'cpage';

export default class Footer extends Component {
    constructor(){
        super();
        this.name = 'footercomp';
        this.props = {
            text: {
                type: 'string',
                default: "footer component"
            }
        };
        this.template = `<h1>{{text}}</h1>`;
    }

    beforeRender(){
        console.log('footer beforeRender')
    }

    render(){
        
    }
}