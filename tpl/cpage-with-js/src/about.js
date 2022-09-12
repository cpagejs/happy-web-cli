import Cpage,  { Component } from 'cpage';

export default class About extends Component {
    constructor(){
        super();
        this.name = 'about';
        this.template = `
            <div>
                about
            </div>
        `;
        this.data = {};
    }

    render(){
        console.log('about',this.$router.params)
    }
}