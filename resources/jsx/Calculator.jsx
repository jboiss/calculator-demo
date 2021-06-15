import { h, Fragment, Component } from 'preact';
import Toggle from './Toggle.jsx';
import Button from './button.jsx';

export default class Calculator extends Component
{
    max_chars = 10;

    state = {
        theme: 'theme1',
        input: [],
        output: 0
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

    componentDidMount()
    {
        let theme = localStorage.getItem('theme');
        if (theme) this.setState({theme: theme});
    }

    undo = () =>
    {
        let undo = [...this.state.input];

        undo.pop();

        this.setState({
            input: [...undo]
        }, () => {
            this.setState({
                 output: ([...undo].length < 1) ? 0 : [...this.state.input].join(''),
            })
        })
    }

    reset = () =>
    {
        this.setState({
            input: [],
            output: 0
        });
    }

    handleInput = (key) =>
    {
        const optable = {
            'x'     : () => this.handleInput('*'),
            'Reset' : this.reset,
            'del'   : this.undo,
            '='     : this.getTotal,
        };

        if (optable.hasOwnProperty(key)) {
            optable[key]();
            return;
        }

        // Prevent illegal duplicates
        const dupes = ['/', '+', '.', '-', '*', 'x'];
        if (dupes.includes(
            this.state.input[this.state.input.length-1]) &&
            dupes.includes(key)
        ) return;

        if (this.state.input.length >= this.max_chars) return;

        this.setState({
            input: [...this.state.input, key.toString()],
        }, () =>  this.setState({output: this.state.input.join('')}));
    }

    getTotal = () =>
    {
        if (this.state.input.length < 1) return;

        let total = this.state.total;
        let op    = this.state.input.join('');

        try {
            total = eval(op);
        } catch(error) {
            return op; 
        }

        this.setState({
            input : [total],
            output: total
        });
    }

    setTheme = (theme) =>
    {
        this.setState({theme: theme}, () => {
            localStorage.setItem('theme', theme);
        });
    }

    render(props, state)
    {
        return (
            <main class={['app', state.theme].join(' ')}>
                <div class="calculator">
                    <header class="panel">
                        <div>calc</div>
                        <Toggle selected={state.theme} setTheme={this.setTheme} />
                    </header>
                    <div class="display">
                        <span class="display__text">{state.output.toLocaleString()}</span>
                    </div>
                    <div class="keypad">
                        {this.keys.map((k) => 
                            <Button press={this.handleInput} keyval={k} />)}
                    </div>
                </div>
            </main>
        );
    }
}
