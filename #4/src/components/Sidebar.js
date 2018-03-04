import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.changeColor = this.changeColor.bind(this);
    this.changeFont = this.changeFont.bind(this);
  }

  changeColor(event) {
    const color = event.target.value;
    this.props.changeBackground(color);
  }

  changeFont(event) {
    const fontFamily = event.target.value;
    this.props.changeFont(fontFamily);
  }

  render() {
    return (
      <section className="sidebar">
        <input
          onChange={this.props.changeFontSize}
          type="text"
          id="fontSize"
          placeholder="Размер текста (px)"
        />
        <select
          onChange={this.changeColor}
          name="backgroundColor"
          id="backgroundColor"
        >
          <option value="yellow">Yellow</option>
          <option value="grey">Grey</option>
          <option value="green">Green</option>
        </select>
        <select onChange={this.changeFont} name="fontFamily" id="fontFamily">
          <option value="roboto">roboto</option>
          <option value="serif">serif</option>
          <option value="sans-serif">sans-serif</option>
          <option value="monospace">monospace</option>
          <option value="cursive">cursive</option>
          <option value="fantasy">fantasy</option>
        </select>
        <button onClick={this.props.removeParagraph} id="deleteP">
          Delete P
        </button>

        <h3>Best CSS frameworks</h3>
        <ul>
          <li>Bootstrap</li>
          <li>Foundation</li>
          <li>Bulma</li>
          <li>Ulkit</li>
          <li>Semantic UI</li>
        </ul>
        <h3>Best JavaScript frameworks</h3>
        <ul>
          <li>Angular</li>
          <li>ReactJS</li>
          <li>Vue.js</li>
          <li>Ember.js</li>
          <li>Meteor.js</li>
        </ul>
      </section>
    );
  }
}

export default Sidebar;
