/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            BEATS: [
                'Testing your freestyle skills since 2017' + '<audio src="https://s3.amazonaws.com/songnyu2/output6.mp3"></audio>',
                'Make your mama proud.' + '<audio src="https://s3.amazonaws.com/songnyu2/output5.mp3"></audio>',
                'Time for your freestyle skills to shine.' + '<audio src="https://s3.amazonaws.com/songnyu2/output4.mp3"></audio>',
            ],
            SKILL_NAME: 'Alexa Beats',
            GET_FACT_MESSAGE: '',
            HELP_MESSAGE: 'Testing your freestyle skills since 2017',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'bye homie',
        },
    },
};

const handlers = {
     'LaunchRequest': function () {
         this.emit('randomSong');
     },
     'SheBeats': function () {
     this.emit('she')
     },
    'GiveMeABeat': function () {
        this.emit('randomSong');
    },
    'randomSong': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const Arr = this.t('BEATS');
        const i = Math.floor(Math.random()*3)
        const randomFact = Arr[i];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },

    'she':function(){
        const phrase="I rap better than Siri because I'm a Loony Toon thats worse than Bugs Bunny you could catch me buzzed like a bee around ya honey people who tried to mess wit me are straight up dummy"
        const speechOutput = this.t('GET_FACT_MESSAGE') + phrase;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), phrase);

    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
