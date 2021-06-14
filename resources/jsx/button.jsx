import { h, render, Component } from 'preact';

function Button(props)
{
    return (
        <button onClick={() => props.press(props.keyval)} class="button">{props.keyval}</button>
    );
}

export default Button;
