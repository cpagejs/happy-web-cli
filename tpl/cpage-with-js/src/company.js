import Cpage,  { Component } from 'cpage';

export default class Company extends Component {
    constructor(){
        super();
        this.name = 'company';
        this.template = `
            <div>
            company
            </div>
        `;
        this.data = {};
    }

    render(){
        console.log('Company component render')
    }
}