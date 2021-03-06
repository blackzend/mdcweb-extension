/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MDCComponent from '@material/base/component';
import MDCExtMultiselectFoundation from './foundation';
import {cssClasses, strings} from './constants';

export {MDCExtMultiselectFoundation};

/** @final @extends {MDCComponent<!MDCExtMultiselectFoundation>} */
export class MDCExtMultiselect extends MDCComponent {
  static attachTo(root) {
    return new MDCExtMultiselect(root);
  }

  initialize(settings = {}) {
    this.settings_ = this.getDefaultSettings_();
    this.settings = settings;
    this.comboboxEl_ = this.root_.querySelector(strings.COMBOBOX_SELECTOR);
    this.displayEl_ = this.root_.querySelector(strings.DISPLAY_SELECTOR);
    this.inputEl_ = this.root_.querySelector(strings.INPUT_SELECTOR);
    this.labelEl_ = this.root_.querySelector(strings.LABEL_SELECTOR);
    this.listEl_ = this.root_.querySelector(strings.LIST_SELECTOR);
    this.listUl_ = this.listEl_.querySelector('ul');
    this.selectEl_ = this.root_.querySelector(strings.SELECT_SELECTOR);
    this.helptextEl_ = null;
    if (this.inputEl_.hasAttribute(strings.ARIA_CONTROLS)) {
      this.helptextEl_ = document.getElementById(this.input_.getAttribute(strings.ARIA_CONTROLS));
    }
  }

  getDefaultFoundation() {
    return new MDCExtMultiselectFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      addClassToLabel: (className) => this.addClassToLabel_(className),
      removeClassFromLabel: (className) => { if (this.labelEl_) this.labelEl_.classList.remove(className); },
      addClassToHelptext: (className) => { if (this.helptextEl_) this.helptextEl_.classList.add(className); },
      removeClassFromHelptext: (className) => { if (this.helptextEl_) this.helptextEl_.classList.remove(className); },
      helptextHasClass: (className) => this.helptextEl_ ? this.helptextEl_.classList.contains(className) : false,
      setHelptextAttr: (attr, value) => { if (this.helptextEl_) this.helptextEl_.setAttribute(attr, value); },
      removeHelptextAttr: (attr) => { if (this.helptextEl_) this.helptextEl_.removeAttribute(attr); },
      addClassToList: (className) => this.listEl_.classList.add(className),
      removeClassFromList: (className) => this.listEl_.classList.remove(className),
      setAttr: (attr, value) => this.root_.setAttribute(attr, value),
      removeAttr: (attr) => this.root_.removeAttribute(attr),
      setInputAttr: (attr, value) => this.inputEl_.setAttribute(attr, value),
      removeInputAttr: (attr) => this.inputEl_.removeAttribute(attr),
      hasClass: (className) => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.comboboxEl_) && Boolean(this.displayEl_) && Boolean(this.inputEl_) &&
        Boolean(this.listEl_) && Boolean(this.listUl_) && Boolean(this.selectEl_),
      getComboboxElOffsetHeight: () => this.comboboxEl_.offsetHeight,
      getComboboxElOffsetTop: () => this.comboboxEl_.offsetTop,
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      registerInputInteractionHandler: (type, handler) => this.inputEl_.addEventListener(type, handler),
      deregisterInputInteractionHandler: (type, handler) => this.inputEl_.removeEventListener(type, handler),
      registerListInteractionHandler: (type, handler) => this.listEl_.addEventListener(type, handler),
      deregisterListInteractionHandler: (type, handler) => this.listEl_.removeEventListener(type, handler),
      focus: () => this.inputEl_.focus(),
      isFocused: () => document.activeElement === this.inputEl_,
      hasItemsLoader: () => (typeof this.settings_.itemsLoader === 'function'),
      applyItemsLoader: (query) => this.applyItemsLoader_(query),
      addItem: (data) => this.addItem_(data),
      removeItems: () => this.removeItems_(),
      addSelectedOption: (value, description) => this.addSelectedOption_(value, description),
      removeSelectedOption: (index) => this.removeSelectedOption_(index),
      updateSelectedOption: (index, value, description) => this.updateSelectedOption_(index, value, description),
      setListElStyle: (propertyName, value) => this.listEl_.style.setProperty(propertyName, value),
      getNumberOfSelectedOptions: () => this.selectedOptions.length,
      getNumberOfItems: () => this.items.length,
      getNumberOfAvailableItems: () => this.availableItems.length,
      getSelectedOptions: () => this.selectedOptions,
      getActiveItem: () => this.activeItem,
      getActiveItemDescription: () => this.activeItem.getAttribute(strings.ITEM_DATA_DESC_ATTR) || this.activeItem.textContent,
      getActiveItemIndex: () => this.getActiveItemIndex_(),
      getActiveItemValue: () => this.activeItem.getAttribute(strings.ITEM_DATA_VALUE_ATTR),
      setActiveItem: (item) => item.classList.add(cssClasses.ITEM_ACTIVE),
      setActiveForItemAtIndex: (index) => this.availableItems[index].classList.add(cssClasses.ITEM_ACTIVE),
      removeActiveItem: () => { if (this.activeItem) this.activeItem.classList.remove(cssClasses.ITEM_ACTIVE); },
      isActiveItemAvailable: () => (this.activeItem && (!this.activeItem.classList.contains(cssClasses.ITEM_NOMATCH))),
      getTextForItemAtIndex: (index) => this.items[index].getAttribute(strings.ITEM_DATA_DESC_ATTR) || this.items[index].textContent,
      getValueForItemAtIndex: (index) => this.items[index].getAttribute(strings.ITEM_DATA_VALUE_ATTR) || this.items[index].id,
      addClassForItemAtIndex: (index, className) => this.items[index].classList.add(className),
      rmClassForItemAtIndex: (index, className) => this.items[index].classList.remove(className),
      setAttrForItemAtIndex: (index, attr, value) => this.items[index].setAttribute(attr, value),
      rmAttrForItemAtIndex: (index, attr) => this.items[index].removeAttribute(attr),
      notifyChange: () => this.emit(strings.CHANGE_EVENT, this),
      getNativeElement: () => this.root_,
      getNativeInput: () => this.inputEl_
    });
  }

  initialSyncWithDOM() {
    const {ARIA_DISABLED} = strings;
    let hasValue = false;
    let l = this.selectedOptions.length;
    if (l > 0) {
      for (let i = 0; i < l; i++) {
        if (this.selectedOptions[i].value)
          hasValue = true;
        this.addDisplayOption_(this.selectedOptions[i].value, this.selectedOptions[i].textContent);
      }
    }
    if (hasValue)
      this.addClassToLabel_(cssClasses.LABEL_FLOAT_ABOVE);

    if (this.root_.getAttribute(ARIA_DISABLED) === 'true') {
      this.disabled = true;
    }
  }

  /** @return {?string} */
  get value() {
    return this.foundation_.getValue();
  }

  /** @param {?string} value */
  set value(value) {
    this.foundation_.setValue(value);
  }

  get settings() {
    return this.settings_ ;
  }

  set settings(settings) {
    Object.assign(this.settings_, settings);
  }

  get disabled() {
    return this.foundation_.isDisabled();
  }

  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  get items() {
    return this.listUl_.querySelectorAll(strings.ITEM_SELECTOR);
  }

  get availableItems() {
    return this.listUl_.querySelectorAll(`${strings.ITEM_SELECTOR}:not(.${cssClasses.ITEM_NOMATCH})`);
  }

  get activeItem() {
    return this.listUl_.querySelector(`.${cssClasses.ITEM_ACTIVE}`);
  }

  get selectedOptions() {
    return this.selectEl_.querySelectorAll(`.${cssClasses.SELECTED_OPTION}`);
  }

  get displayedOptions() {
    return this.displayEl_.querySelectorAll(`.${cssClasses.SELECTED_OPTION}`);
  }

  addItems(itemArray) {
    this.foundation_.addItems(itemArray);
  }

  removeItems() {
    this.foundation_.removeItems();
  }

  getDefaultSettings_() {
    return {
      itemValueProperty: 'value',
      itemDescriptionProperty: 'description',
      itemsLoader: undefined
    };
  }

  addClassToLabel_(className) {
    if (this.labelEl_)
      this.labelEl_.classList.add(className);
  }

  applyItemsLoader_(query) {
    var self = this;
    this.settings_.itemsLoader.apply(self, [query, function(results) {
      if (results && results.length) {
        self.foundation_.removeItems();
        self.foundation_.addItems(results);
        self.foundation_.refreshItems();
      }
    }]);
  }

  addItem_(data) {
    if (this.listUl_ !== undefined) {
      const {LIST_ITEM} = cssClasses;
      const {ITEM_DATA_VALUE_ATTR, ITEM_DATA_DESC_ATTR} = strings;
      let value = data[this.settings_.itemValueProperty];
      let description = data[this.settings_.itemDescriptionProperty];
      var node = document.createElement('li');
      node.classList.add(LIST_ITEM);
      node.setAttribute('role', 'option');
      node.setAttribute(ITEM_DATA_VALUE_ATTR, value);
      node.setAttribute(ITEM_DATA_DESC_ATTR, description);
      var textnode = document.createTextNode(description);
      node.appendChild(textnode);
      this.listUl_.appendChild(node);
    }
  }

  removeItems_() {
    if (this.listUl_ !== undefined) {
      while(this.listUl_.hasChildNodes()) this.listUl_.removeChild(this.listUl_.firstChild);
    }
  }

  addSelectedOption_(value, description) {
    const {SELECTED_OPTION} = cssClasses;
    const {SELECTED_ATTR} = strings;
    if (this.selectEl_ !== undefined) {
      var node = document.createElement('option');
      node.classList.add(SELECTED_OPTION);
      node.setAttribute(SELECTED_ATTR, 'selected');
      node.value = value;
      var textnode = document.createTextNode(description);
      node.appendChild(textnode);
      this.selectEl_.appendChild(node);
    }
    this.addDisplayOption_(value, description);
  }

  addDisplayOption_(value, description) {
    const {SELECTED_OPTION} = cssClasses;
    const {ITEM_DATA_VALUE_ATTR} = strings;
    if ((this.displayEl_ !== undefined) && (this.inputEl_ !== undefined)) {
      var node = document.createElement('span');
      node.classList.add(SELECTED_OPTION);
      node.setAttribute(ITEM_DATA_VALUE_ATTR, value);
      var textnode = document.createTextNode(description);
      node.appendChild(textnode);
      this.displayEl_.insertBefore(node, this.inputEl_);
    }
  }

  removeSelectedOption_(index) {
    if ((this.selectEl_ === undefined) || (this.displayEl_ === undefined))
      return;
    if (index < this.selectedOptions.length) {
      this.selectEl_.removeChild(this.selectedOptions[index]);
      this.displayEl_.removeChild(this.displayedOptions[index]);
    }
  }

  updateSelectedOption_(index, value, description) {
    const {SELECTED_OPTION} = cssClasses;
    const {SELECTED_ATTR} = strings;
    if ((this.selectEl_ === undefined) || (this.displayEl_ === undefined) ||
      (index >= this.selectedOptions.length))
      return;
    let element = this.selectedOptions[index];
    element.value = value;
    let textnode = element.childNodes[0];
    if (textnode) {
      textnode.nodeValue = description;
    } else {
      textnode = document.createTextNode(description);
      element.appendChild(textnode);
    }
    this.updateDisplayOption_(index, value, description);
  }

  updateDisplayOption_(index, value, description) {
    const {SELECTED_OPTION} = cssClasses;
    const {ITEM_DATA_VALUE_ATTR} = strings;
    if (this.displayEl_ == undefined)
      return;
    let element = this.displayedOptions[index];
    element.setAttribute(ITEM_DATA_VALUE_ATTR, value);
    let textnode = element.childNodes[0];
    if (textnode) {
      textnode.nodeValue = description;
    } else {
      textnode = document.createTextNode(description);
      element.appendChild(textnode);
    }
  }

  getActiveItemIndex_() {
    let currentItem = this.activeItem;
    if (!currentItem)
      return undefined;
    let el = currentItem;
    let count = 0;
    while (el = el.previousSibling) {
      if ((el.nodeType == currentItem.nodeType) && (!el.classList.contains(cssClasses.ITEM_NOMATCH)))
        count++;
    }
    return count;
  }
}
