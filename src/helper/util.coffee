export default class Util
    @transitionEndEvents: ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'otransitionend', 'MSTransitionEnd']

    # Returns the given element.
    # @params {HTMLElement|String} el
    # @returns {HTMLElement}
    @getElement: (el) ->
        if typeof el == 'string'
            return document.querySelector el
        el

    # Attaches the events to the element.
    # @params {HTMLElement} el
    # @params {String[]} events
    # @params {EventListener} callback
    @addMultiEventListener: (el, events, callback) ->
        for i in events
            el.addEventListener i, callback, true

    # Removes the events from the element.
    # @params {HTMLElement} el
    # @params {String[]} events
    # @params {EventListener} callback
    @removeMultiEventListener: (el, events, callback) ->
        for i in events
            el.removeEventListener i, callback, true

    # Attaches the events to the element for once.
    # @params {HTMLElement} el
    # @params {String[]} events
    # @params {EventListener} callback
    @addMultiEventListenerOnce: (el, events, callback) ->
        cb = (e) =>
            @removeMultiEventListener el, events, cb
            callback e
        @addMultiEventListener el, events, cb