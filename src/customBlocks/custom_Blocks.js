import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import { setAngle } from "../store/characterSlice";

// Motion Blocks
Blockly.Blocks["move_y"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move")
      .appendField(new Blockly.FieldNumber(0), "move-y")
      .appendField("steps in Y direction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["move_x"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move")
      .appendField(new Blockly.FieldNumber(0), "move-x")
      .appendField("steps in X direction");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["turn_clockwise"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turn")
      .appendField(
        new Blockly.FieldImage(
          "https://scratch.mit.edu/static/blocks-media/rotate-right.svg",
          20,
          20,
          { alt: "turn-clockwise", flipRtl: "FALSE" }
        )
      )
      .appendField(new Blockly.FieldAngle(0), "turn-right")
      .appendField("degree");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["turn_anti_clockwise"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turn")
      .appendField(
        new Blockly.FieldImage(
          "https://scratch.mit.edu/static/blocks-media/rotate-left.svg",
          20,
          20,
          { alt: "turn-anti-clock", flipRtl: "FALSE" }
        )
      )
      .appendField(new Blockly.FieldAngle(0), "turn-left")
      .appendField("degree");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["goto_custom_location"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Go to x:")
      .appendField(new Blockly.FieldNumber(0), "goto-x")
      .appendField("y:")
      .appendField(new Blockly.FieldNumber(0), "goto-y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

// Looks blocks
Blockly.Blocks["sprite_size"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Change size by")
      .appendField(new Blockly.FieldNumber(0, 0), "size");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["say_message"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("say")
      .appendField(new Blockly.FieldTextInput("Hello!"), "message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["say_message_timed"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("say")
      .appendField(new Blockly.FieldTextInput("Hello!"), "message")
      .appendField("for")
      .appendField(new Blockly.FieldNumber(2, 0), "time")
      .appendField("seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["show_sprite"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldLabelSerializable("show sprite"),
      "show_message"
    );
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["hide_sprite"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldLabelSerializable("hide sprite"),
      "hide"
    );
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["hide_message"] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(
        new Blockly.FieldLabelSerializable("hide message"),
        "hide_message"
      );
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

// Events blocks
Blockly.Blocks["key_pressed"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("when")
      .appendField(
        new Blockly.FieldDropdown([
          ["space key pressed", "space"],
          ["enter key pressed", "enter"],
        ]),
        "pressed_key"
      );
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

// Javascript generators used to run some code to change state of sprite.

// Move y block
javascriptGenerator["move_y"] = (block) => {
  var number_move_y = block.getFieldValue("move-y");

  var active_sprite = store.getState().characters.active;

  var code = `
    var sprite = document.getElementById("${active_sprite}");
    var offset = sprite.offsetTop - sprite.scrollTop;

    if(${number_move_y} > 0) {

      sprite.style.top = offset + ${number_move_y} + 'px';
    } 
    else if(${number_move_y} < 0) {

      sprite.style.top = offset + ${number_move_y} + 'px';
    }
  `;

  return code;
};

// Move x block
javascriptGenerator["move_x"] = (block) => {
  var number_move_x = block.getFieldValue("move-x");

  var active_sprite = store.getState().characters.active;

  var code = `
    var sprite = document.getElementById("${active_sprite}");
    var offset = sprite.offsetLeft - sprite.scrollLeft;

    if(${number_move_x} > 0) {

      sprite.style.left = offset + ${number_move_x} + 'px';
    } 
    else if(${number_move_x} < 0) {

      sprite.style.left = offset + ${number_move_x} + 'px';
    }
  `;

  return code;
};

// Turn clockwise block
javascriptGenerator["turn_clockwise"] = (block) => {
  var angle_turn_right = block.getFieldValue("turn-right");

  var active_sprite = store.getState().characters.active;

  store.dispatch(setAngle(angle_turn_right));
  var angle = store.getState().characters.characters[0].angle;

  var code = `
    var sprite = document.getElementById("${active_sprite}");
    sprite.style.transform = 'rotate(${angle_turn_right + angle}deg)';
  `;

  return code;
};

// Turn anti-clockwise block
javascriptGenerator["turn_anti_clockwise"] = (block) => {
  var angle_turn_left = block.getFieldValue("turn-left");

  var active_sprite = store.getState().characters.active;

  store.dispatch(setAngle(angle_turn_left));
  var angle = store.getState().character.characters[0].angle;

  var code = `
    var sprite = document.getElementById("${active_sprite}");
    sprite.style.transform = 'rotate(-${angle_turn_left + angle}deg)';
  `;

  return code;
};

// Goto location block
javascriptGenerator["goto_custom_location"] = (block) => {
  var active_sprite = store.getState().characters.active;

  var number_goto_x = block.getFieldValue("goto-x");
  var number_goto_y = block.getFieldValue("goto-y");

  var code = `
    var sprite = document.getElementById("${active_sprite}");
    var offsetTop = sprite.offsetTop - sprite.scrollTop;
    var offsetLeft = sprite.offsetLeft - sprite.scrollLeft;

    if(${number_goto_x} != 0 && ${number_goto_y} != 0) {

      sprite.style.top = offsetTop + ${number_goto_y} + 'px';
      sprite.style.left = offsetLeft + ${number_goto_x} + 'px';
    } 
  `;

  return code;
};

// Size block
javascriptGenerator["sprite_size"] = (block) => {
  var number_size = block.getFieldValue("size");

  var active_sprite = store.getState().characters.active;

  var code = `
    var sprite = document.getElementById("${active_sprite}");

    sprite.style.transform = 'scale(${number_size})';
  `;

  return code;
};

// Say message block
javascriptGenerator["say_message"] = (block) => {
  var text_message = block.getFieldValue("message");

  var active_sprite = store.getState().characters.active;

  var code = `
    var messageBox = document.getElementById("${active_sprite}-message-box-2");

    messageBox.innerHTML = '${text_message}';
    messageBox.style.display = 'block';
  `;

  return code;
};

// Say timed message block
javascriptGenerator["say_message_timed"] = (block) => {
  var active_sprite = store.getState().characters.active;

  var text_message = block.getFieldValue("message");
  var number_time = block.getFieldValue("time");

  var code = `
    var messageBox = document.getElementById("${active_sprite}-message-box-2");

    function hide() {

      messageBox.style.display = 'none';
    }

    messageBox.innerHTML = '${text_message}';
    messageBox.style.display = 'block';

    setTimeout(hide, ${number_time}*1000)
  `;

  return code;
};

// Show sprite block
javascriptGenerator["show_sprite"] = (block) => {
  var active_sprite = store.getState().characters.active;

  var code = `
    var sprite = document.getElementById("${active_sprite}");
    sprite.style.display = 'block';
  `;

  return code;
};

// Hide sprite block
javascriptGenerator["hide_sprite"] = (block) => {
  var active_sprite = store.getState().characters.active;

  var code = `
    var sprite = document.getElementById("${active_sprite}");
    sprite.style.display = 'none';
  `;

  return code;
};

// Hide message block
javascriptGenerator["hide_message"] = (block) => {
  var active_sprite = store.getState().characters.active;

  var code = `
    var messageBox = document.getElementById("${active_sprite}-message-box-2");
    messageBox.style.display = 'none';
  `;

  return code;
};

// Key press event block
javascriptGenerator["key_pressed"] = (block) => {
  var dropdown_pressed_key = block.getFieldValue("pressed_key");

  var code = "...;\n";

  return code;
};
