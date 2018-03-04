import React, { Component } from "react";
import firebase from "firebase";
import $ from "jquery";
import "./style.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      backgroundColor: "yellow",
      fontFamily: "roboto",
      fontSize: 12
    };

    this.loggedIn = this.loggedIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.changeBackground = this.changeBackground.bind(this);
    this.changeFont = this.changeFont.bind(this);
    this.changeFontSize = this.changeFontSize.bind(this);
    this.removeParagraph = this.removeParagraph.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.loggedIn);
  }

  loggedIn(user) {
    // console.log("App@loggedIn user", user);
    this.setState({ user });
  }

  logOut() {
    this.setState({ user: null });
  }

  changeBackground(color) {
    this.setState({ backgroundColor: color });
  }

  changeFont(fontFamily) {
    this.setState({ fontFamily });
  }

  changeFontSize(event) {
    const fontSize = +event.target.value;
    if (fontSize === 0) {
      return;
    } else if (fontSize < 8 || fontSize > 24) {
      console.error("Введите целое число от 8 до 24");
      return;
    } else if (!fontSize) {
      return alert("Только числа");
    } else if (Math.ceil(fontSize) - fontSize > 0) {
      return alert("Введите целое число!");
    } else {
      this.setState({ fontSize });
    }
  }

  removeParagraph() {
    $("p")
      .last()
      .remove();
  }

  render() {
    const { user, backgroundColor, fontFamily, fontSize } = this.state;

    return (
      <div className="wrapper">
        <div className="site-content">
          <Header user={user} loggedIn={this.loggedIn} logOut={this.logOut} />
          <div className="container">
            <section
              className="content"
              style={{ backgroundColor, fontFamily, fontSize: `${fontSize}px` }}
            >
              <div>
                <h1>Основные языки Front-End</h1>
                <h3>HTML</h3>
                <p>
                  HTML (от англ. HyperText Markup Language — «язык
                  гипертекстовой разметки») — HTML (или XHTML). Язык HTML
                  интерпретируется браузерами; полученный в результате
                  интерпретации форматированный текст отображается на экране
                  монитора компьютера или мобильного устройства.
                </p>
                <p>
                  Язык HTML до 5-ой версии определялся как приложение SGML
                  (стандартного обобщённого языка разметки по стандарту ISO
                  8879). Спецификации HTML5 формулируются в терминах DOM
                  (объектной модели документа).
                </p>
                <p>
                  Язык XHTML является более строгим вариантом HTML, он следует
                  синтаксису XML и является приложением языка XML в области
                  разметки гипертекста.
                </p>
                <p>
                  Во всемирной паутине HTML-страницы, как правило, передаются
                  браузерам от сервера по протоколам HTTP или HTTPS, в виде
                  простого текста или с использованием шифрования.
                </p>
                <h3>CSS</h3>
                <p>
                  CSS (/siːɛsɛs/ англ. Cascading Style Sheets — каскадные
                  таблицы стилей) — формальный язык описания внешнего вида
                  документа, написанного с использованием языка разметки.
                </p>
                <p>
                  Преимущественно используется как средство описания, оформления
                  внешнего вида веб-страниц, написанных с помощью языков
                  разметки HTML и XHTML, но может также применяться к любым
                  XML-документам, например, к SVG или XUL.
                </p>
                <h3>JavaScript</h3>
                <p>
                  JavaScript (/ˈdʒɑːvɑːˌskrɪpt/; аббр. JS /ˈdʒeɪ.ɛs./) —
                  мультипарадигменный язык программирования. Поддерживает
                  объектно-ориентированный, императивный и функциональный стили.
                  Является реализацией языка ECMAScript (стандарт ECMA-262[6]).
                </p>
                <p>
                  JavaScript обычно используется как встраиваемый язык для
                  программного доступа к объектам приложений. Наиболее широкое
                  применение находит в браузерах как язык сценариев для придания
                  интерактивности веб-страницам[7].
                </p>
                <p>
                  Основные архитектурные черты: динамическая типизация, слабая
                  типизация, автоматическое управление памятью, прототипное
                  программирование, функции как объекты первого класса.
                </p>
                <p>
                  На JavaScript оказали влияние многие языки, при разработке
                  была цель сделать язык похожим на Java, но при этом лёгким для
                  использования непрограммистами. Языком JavaScript не владеет
                  какая-либо компания или организация, что отличает его от ряда
                  языков программирования, используемых в веб-разработке[~
                  1][8].
                </p>
                <p>
                  Название «JavaScript» является зарегистрированным товарным
                  знаком компании Oracle Corporation[9].
                </p>
              </div>
            </section>

            {user && (
              <Sidebar
                changeBackground={this.changeBackground}
                changeFont={this.changeFont}
                changeFontSize={this.changeFontSize}
                removeParagraph={this.removeParagraph}
              />
            )}
          </div>
        </div>
        <footer>
          <p>qwertyFEschool Andrey Panchenko 2018 &copy;</p>
          <div className="social">
            <a href="/">
              <i className="fa fa-instagram" aria-hidden="true" />
            </a>
            <a href="/">
              <i className="fa fa-vk" aria-hidden="true" />
            </a>
            <a href="/">
              <i className="fa fa-youtube-square" aria-hidden="true" />
            </a>
            <a href="/">
              <i className="fa fa-twitter-square" aria-hidden="true" />
            </a>
            <a href="/">
              <i className="fa fa-facebook-official" aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
