/** @jsx React.DOM */

'use strict';

var React = require('react'),

    Answers = React.createClass({

      /** 
       * Handling
       */

      onAnswerClick: function(click) {
        this.props.onAnswer(click.target.getAttribute("data-answer"));
      },

      /** 
       * Rendering
       */

      shuffled_answers: function(arr) {
        var o = this.props.answers
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      },

      images: function() {
        var answer, _i, _len, _ref, imgs = [];
        _ref = this.shuffled_answers();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            answer = _ref[_i];
            imgs.push(<div className="answer"><img src={answer.image} data-answer={answer.name}  onClick={this.onAnswerClick} /></div>);
        }
        return imgs;
      },

      render: function() {
        return (
          <div className="answers">{this.images()}</div>
        )
      }


    });

module.exports = Answers;
