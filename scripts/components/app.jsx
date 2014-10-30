/** @jsx React.DOM */

'use strict';

var React = require('react'),
    questions = require('../questions.js'),
    Answers = require('./answers.jsx'),

    App = React.createClass({

      /** 
       * Set up
       */
      getInitialState: function() {
        return {
          question: 0
        }
      },

      getDefaultProps: function() {
        return {
          questions: questions
        }
      },

      componentWillMount: function () {
        this.setupDatabase();
      },

      /** 
       * Data
       */

      dbSet: function(key, value) {
       return sessionStorage.setItem(key, JSON.stringify(value));
      },

      dbGet: function(key) {
        return JSON.parse(sessionStorage.getItem(key));
      },

      /** 
       * Logic
       */

      setupDatabase: function() {
        var answer, question, questionObj, _i, _j, _len, _len1, _ref;

        for (_i = 0, _len = questions.length; _i < _len; _i++) {
          question = questions[_i];
          if (!sessionStorage.getItem(question.question)) {
            questionObj = {};
            _ref = question.answers;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              answer = _ref[_j];
              questionObj[answer.name] = 0;
            }
            this.dbSet(question.question, questionObj);
          }
        }
      },

      displayResults: function() {
        var answer, answers, count, log, question, _i, _len, _ref;

        _ref = this.props.questions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          question = _ref[_i];
          log = "%c QUESTION: " + question.question + " \n";
          console.log(log,  'background: #2fb357; color: #FFF');
          log = '%c\n';
          answers = this.dbGet(question.question);
          for (answer in answers) {
            count = answers[answer];
            log += " " + answer + ": " + count + " \n";
          }
          log += "\n\n";
          console.log(log,  'background: #FFF; color: #2fb357');
        }

        console.log("%c-----------------------------------------",  'background: #222; color: #2fb357;');

      },

      recordAnswer: function(answer) {
        var question_name = this.props.questions[this.state.question].question;
        var question = this.dbGet(question_name)
        question[answer]++;
        this.dbSet(question_name, question);
      },

      reset: function() {
        alert("Thanks for your time!"); 
        this.setState({question: 0});
      },

      nextQuestion: function() {
       var next = this.state.question + 1;
       if(next == this.props.questions.length) return this.reset();
       this.setState({question:next});
      },

      /** 
       * Handling
       */

      onAnswer: function(answer) {
        this.recordAnswer(answer);
        this.nextQuestion();
      },

      /** 
       * Rendering
       */

      render: function() {
        var current_question = this.props.questions[this.state.question];
        this.displayResults();
        return (
          <div>
            <h1 className="question">
              <div>Imagine you're looking for a discount</div>
              <div>{current_question.question}</div>
            </h1>
            <Answers answers={current_question.answers} onAnswer={this.onAnswer} />
          </div>
        )
      }


    });

module.exports = App;
