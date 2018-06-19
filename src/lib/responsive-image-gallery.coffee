import defaultOptions from './default-options'
import Util from '../helper/util'

export default class ResponsiveImageGallery
    # @params {Object} o
    constructor: (o=defaultOptions) ->
        @extractAttributes o

        unless @el = Util.getElement(o.el)
            throw new Error 'Element could not be found'

        @el.style.position = 'relative'
        @el.style.overflow = 'hidden'

        if @bar = Util.getElement(o.bar)
            if activeEl = @bar.querySelector "*[category='#{@active}']"
                activeEl.classList.add 'rig-active'

            categories = @bar.querySelectorAll '*[category]'
            @setCategory = @setCategory.bind @
            for c in categories
                c.addEventListener 'click', @setCategory, true

        @elements = []
        for c in @el.children
            c.style.position = 'absolute'
            @elements.push {
                el: c
                category: c.getAttribute 'category'
                active: true
            }

        @resize = @resize.bind @
        window.addEventListener 'resize', @resize, true
        @resize()

    # Extracts attributes from default options.
    # @params {Object} o
    extractAttributes: (o) ->
        for key, value of defaultOptions
            o[key] = value unless o[key]?

        for key, value of o
            @[key] = value if value?

    # @params {Event} e
    setCategory: (e) ->
        @set e.target.getAttribute('category')

    # Returns the active category.
    # @returns {String}
    get: ->
        @active

    # Sets the new category and animates.
    # @params {String} active
    # @params {Boolean} animate
    set: (active, animate=true) ->
        unless @processing && active == @active
            @processing = true
            @active = active

            if @bar
                if e = @bar.querySelector '.rig-active'
                    e.classList.remove 'rig-active'
                if e = @bar.querySelector "*[category='#{@active}']"
                    e.classList.add 'rig-active'

            @animate animate

    # @returns {String}
    getTiming: ->
        @timing 

    # @params {String} timing
    setTiming: (@timing) ->

    # @returns {Number}
    getDuration: ->
        @duration

    # @params {Number} duration
    setDuration: (@duration) ->

    # Destroys the gallery.
    destroy: ->
        window.removeEventListener 'resize', @resize, true
        
        if @bar
            categories = @bar.querySelectorAll '*[category]'
            for c in categories
                c.removeEventListener 'click', @setCategory, true

        @el.innerHTML = ''

    # Resizes elements.
    resize: ->
        unless @processing
            @processing = true
            w = @el.offsetWidth
            count = (Math.floor w / @minWidth) + 1
            
            loop
                count -= 1
                area = (@minWidth * count) + (@horizontalSpace * (count - 1))
                break if w >= area || count < 2

            if count < 2
                count = 1
                @width = if @overflow then @minWidth else w
            else
                @width = (w - (@horizontalSpace * (count - 1))) / count
            
            @width = @maxWidth if @width > @maxWidth

            status = count != @count && @count?
            @count = count
            @animate status
        else
            clearTimeout @processingTimeout if @processingTimeout
            @processingTimeout = setTimeout @resize, 500

    # Sets the width and position of gallery elements.
    # @params {Boolean} animation
    animate: (animation=true) ->
        row = -1
        rowHeight = []
        columnHeight = 0
        nColumnHeight = 0
        height = (@width * @height) / 100 if @height
        @completed = 0

        for g in @elements
            if g.category == @active || @active == '*'
                unless g.active
                    unactive = true
                    g.active = true
                    g.el.setAttribute 'style', (g.el.getAttribute('style') || '').replace(/height[^;]+;?/g, '')
                    g.el.style.visibility = 'visible'

                g.el.style.width = "#{@width}px"
                g.el.style.height = "#{height}px" if height
                oLeft = g.left
                oTop = g.top

                h = g.el.offsetHeight + @verticalSpace
                if @grid
                    unless (row += 1) < @count
                        row = 0
                        columnHeight += nColumnHeight
                        nColumnHeight = 0

                    g.top = columnHeight
                    nColumnHeight = h if h > nColumnHeight
                else
                    for r in [0..@count-1]
                        unless rowHeight[r]?
                            rowHeight[r] = 0

                        row = r if rowHeight[r] < rowHeight[row] || !rowHeight[row]?

                    g.top = rowHeight[row]
                    rowHeight[row] += h
                g.left = (@width * row)  + (@horizontalSpace * row)
                
                style = g.el.getAttribute('style').replace /(-webkit-transition|-ms-transition|transition)[^;]+;?/g, ''
                if animation
                    t = "#{@duration}ms 0s #{@timing}"
                    style += """
                        -webkit-transition: -webkit-transform #{t};
                        -ms-transition: -ms-transform #{t};
                        transition: transform #{t};
                    """
                g.el.setAttribute 'style', style

                g.el.style.opacity = 1
                transform = "translate(#{g.left}px, #{g.top}px) scale(1)"
                g.el.style.webkitTransform = transform
                g.el.style.msTransform = transform
                g.el.style.transform = transform

                if animation && (oLeft != g.left || oTop != g.top || unactive?)
                    Util.addMultiEventListenerOnce g.el, Util.transitionEndEvents, @completeProcess.bind(@)  
                else
                    @completed += 1
            else
                unless g.active
                    @completed += 1
                else
                    unless animation
                        @completed += 1
                        g.active = false
                        g.el.setAttribute 'style', 'position:absolute;visibility:hidden;width:0;height:0;-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75)'
                        g.left = 0
                        g.top = 0
                    else
                        style = (g.el.getAttribute('style') || '').replace /(-webkit-transition|-ms-transition|transition|-webkit-transform|-ms-transform|transform)[^;]+;?/g, ''
                        t = "#{@duration}ms 0s #{@timing}, opacity #{@duration}ms 0s #{@timing}, visibility 0s #{@duration + 1}ms #{@timing}"
                        transform = "translate(#{g.left}px, #{g.top}px) scale(.75)"
                        style += """
                            -webkit-transition: -webkit-transform #{t};
                            -ms-transition: -ms-transform #{t};
                            transition: transform #{t};
                            -webkit-transform: #{transform};
                            -ms-transform: #{transform};
                            transform: #{transform};
                            opacity: 0;
                            visibility: hidden;
                        """
                        g.el.setAttribute 'style', style

                        do (g) =>
                            Util.addMultiEventListenerOnce g.el, Util.transitionEndEvents, () =>
                                g.active = false 
                                g.el.setAttribute 'style', 'position:absolute;visibility:hidden;-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);width:0;height:0;opacity:0;'
                                g.left = 0
                                g.top = 0
                                @completeProcess()
                        (g)


        elHeight = @elHeight
        if @grid
            @elHeight = nColumnHeight + columnHeight - @verticalSpace
        else
            h = rowHeight.reduce (a, b) =>
                if a > b then a else b
            , 0
            @elHeight = h - @verticalSpace

        unless elHeight == @elHeight
            style = (@el.getAttribute('style') || '').replace /(-webkit-transition|-ms-transition|transition)[^;]+;?/g, ''
            if animation
                t = "height #{@duration}ms 0s #{@timing}"
                style += """
                    -webkit-transition: #{t};
                    -ms-transition: #{t};
                    transition: #{t};
                """
            style += "height:#{@elHeight}px;"
            @el.setAttribute 'style', style
            @resize()
        
        if @completed == @elements.length
            @processing = false

    completeProcess: ->
        if (@completed += 1) == @elements.length
            @processing = false