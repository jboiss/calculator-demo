import { h, Fragment, Component } from 'preact';
import Button from './button.jsx';
import calculate from './mathutils.js';

export default class Calculator extends Component
{
    state = {
        theme: 1,
        total: 0,
        input: [],
        ops: [],
    };

    keys = [
        7,8,9,"del",
        4,5,6,'+',
        1,2,3,'-',
        '.','0','/','x',
        'Reset','='
    ];

    constructor(props)
    {
        super(props);
    }

    reset = (key) =>
    {
        this.setState({
            total: 0,
            input: [],
            ops: []
        }, () => console.log(this.state.input));
    }

    del = (key) =>
    {
        this.setState({
            input: [...this.state.input].pop()
        }, () => console.log(this.state.input));
    }

    handleInput = (key) =>
    {
        const optable = {
            '+' : () => calculate(this.state.input),
            '-' : () => calculate(this.state.input),
            '/' : () => calculate(this.state.input),
            'x' : () => calculate(this.state.input),
            'Reset' : this.reset,
            'del'   : this.del
        };
        
        if (optable.hasOwnProperty(key)) optable[key]();

        this.setState({
            input: [...this.state.input, key]
        });
    }

    render(props, state)
    {
        return (
            <main class="theme1">
                <header class="panel">
                    calc
                    <div>theme</div>
                </header>
                <main class="display">
                    {state.total}
                </main>
                <section class="keypad">
                    {this.keys.map((k) => 
                        <Button press={this.handleInput} keyval={k} />)}
                </section>
            </main>
        );
    }
}
