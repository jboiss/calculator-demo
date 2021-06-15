import { h, Fragment, Component } from 'preact';

export default class extends Component
{
    themes = ['theme1', 'theme2', 'theme3'];

    constructor(props)
    {
        super(props);

        this.state = {
            selected: props.selected
        };
    }

    handleClick = (e) =>
    {
        let current = this.themes.indexOf(this.props.selected);
        let next = (current === this.themes.length-1) ? 0 : current+1; 
        this.props.setTheme(this.themes[next]);
    }

    render(props, state)
    {
        return(
            <form class="toggle">
                <div class="toggle__labels">
                    {this.themes.map((k, i) =>
                        <label class="toggle__label" for={k}>{i+1}</label>
                    )}
                </div>
                <div class="toggle__stamp">Theme</div>
                <div onClick={this.handleClick} class="toggle__switch">
                    {this.themes.map((k, i) =>
                        <input id={k} onChange={(e) => props.setTheme(e.target.value)} type="radio" name="theme" value={k} checked={(props.selected === k)} class="toggle__control" />
                    )}
                    <div class="toggle__ball"></div>
                </div>
            </form>
        );
    }
}