'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var cow = require('./cow');

var ThingSchema = new Schema({
  ID: String,
  owner: String,
  birthday: Date,
  sex: {
    type: String,
    enum : cow.SEX
  },
  poroda: {
    type: String,
    enum : cow.PORODY
  },
  motherID: String,
  chipDate: Date,
  chipLocation: {
    type: String,
    enum : cow.CHIP_LOCATIONS
  },
  hair: {
    type: String,
    enum : cow.HAIRS
  },
  specialCharacteristics: {
    type: String,
    enum : cow.SPEC_CHARS
  },
  reproduction: {
    type: String,
    enum : cow.REPRODUCTION_CHOICES
  },
  group: {
    type: String,
    enum : cow.GROUPS
  }
});

module.exports = mongoose.model('Thing', ThingSchema);
