/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const clipboard = require('electron').clipboard;
const events = require('events');
const eventEmitter = new events.EventEmitter();
const preferencesHelper = require('./PreferencesHelper');

const CLIPBOARD_CHANGED_EVENT = 'clipboard_changed';
const CLIPBOARD_POLLING_INTERVAL = 200; // in ms
let initialized = false;
let intervalHandler;

let clipboardTextContent;
let clipboardHtmlContent;
let clipboardImageContent;

let previousClipboardTextContent;
let previousClipboardHtmlContent;
let previousClipboardImageContent;

/**
 * Meant to called from `pollingCallback`
 */
function updateClipboardCurrentValues() {
  clipboardTextContent = clipboard.readText();
  clipboardHtmlContent = clipboard.readHtml();
  clipboardImageContent = clipboard.readImage();
}

/**
 * Meant to called whenever clipboard content is changed
 */
function updateClipboardPreviousValues() {
  previousClipboardTextContent = clipboardTextContent;
  previousClipboardHtmlContent = clipboardHtmlContent;
  previousClipboardImageContent = clipboardImageContent;
}

function pollingCallback() {

  updateClipboardCurrentValues();
  let availableFormats = clipboard.availableFormats();

  let result = {};
  let changed = false;

  if(clipboardTextContent != previousClipboardTextContent) {
    result.text = clipboardTextContent;
    changed = true;
  }

  if(clipboardHtmlContent != previousClipboardHtmlContent && clipboardHtmlContent != '') {
    result.html = clipboardHtmlContent;
    changed = true;
  }

  if(clipboardImageContent.toDataURL() != previousClipboardImageContent.toDataURL()) {
    result.image = clipboardImageContent;
    changed = true;
  }

  if(changed) {

    //FIXME this call fixes "can't catch recurring copy events" bug IN EXPENSE of
    // clearing the user's clipboard content. When user hits CTRL+V nothing happens :(
    if(preferencesHelper.isVerbose()) {
      clipboard.clear();
    }

    updateClipboardPreviousValues();
    eventEmitter.emit(CLIPBOARD_CHANGED_EVENT, result);
  }

}

module.exports = {
  initialize: function () {
    if(initialized) {
      console.error('ClipboardEventEmitter is alread initialized');
      return;
    }
    initialized = true;

    clipboardTextContent = clipboard.readText();
    clipboardHtmlContent = clipboard.readHtml();
    clipboardImageContent = clipboard.readImage();

    previousClipboardTextContent;
    previousClipboardHtmlContent;
    previousClipboardImageContent;

    updateClipboardPreviousValues();

    // Start polling because we have to https://github.com/atom/electron/issues/2280
    intervalHandler = setInterval(pollingCallback, CLIPBOARD_POLLING_INTERVAL);
  },
  onChange: function (callback) {
    if(typeof callback === 'function') {
      eventEmitter.addListener(CLIPBOARD_CHANGED_EVENT, callback);
    }
    else {
      throw 'callback must be a function';
    }
  },
  stop: () => {
    clearInterval(intervalHandler)
    eventEmitter.removeAllListeners();
  },
  //TODO add removeListener(callback) method to this module
};
