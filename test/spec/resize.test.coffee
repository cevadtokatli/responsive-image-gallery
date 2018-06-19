describe 'resize', ->
    before ->
        el = document.createElement 'div'
        el.style.width = "1140px"
        el.innerHTML += "<div category='#{if i % 2 == 0 then 'category-a' else 'category-b'}'></div>" for i in [0...10]
        document.body.appendChild el

        @minWidth = 300
        @maxWidth = 600
        @gallery = new ResponsiveImageGallery {
            el
            minWidth: @minWidth
            maxWidth: @maxWidth
            height: 50
        }

    it 'should keep the width between the min and max width', ->
        width = @gallery.elements[0].el.offsetWidth
        expect(width).to.be.at.least @minWidth
        expect(width).to.be.at.most @maxWidth

    it 'should set the height by ratio', ->
        height = @gallery.elements[0].el.offsetHeight
        expectedHeight = 187
        expect(height).to.eql expectedHeight