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
export const cssClasses = {
  ROOT: 'mdc-ext-autocomplete',
  DISABLED: 'mdc-ext-autocomplete--disabled',
  OPEN: 'mdc-ext-autocomplete--open',
  TEXTFIELD: 'mdc-ext-autocomplete__textfield',
  LIST: 'mdc-ext-autocomplete__list',
  LIST_ITEM: 'mdc-list-item',
  ITEM_ACTIVE: 'mdc-list-item--active',
  ITEM_NOMATCH: 'mdc-list-item__nomatch'
};

export const strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ARIA_SELECTED_ATTR: 'aria-selected',
  CHANGE_EVENT: 'MDCExtAutocomplete:change',
  ITEM_DATA_VALUE_ATTR: 'data-value',
  ITEM_DATA_DESC_ATTR: 'data-description'
};

/** @enum {number} */
export const numbers = {
  // Amount of miliseconds to wait before triggering a change value functionality.
  CHANGE_VALUE_TRIGGER_DELAY: 500
}
