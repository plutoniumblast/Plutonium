// TAG BALL
$( document ).ready( function () {
      if ( !$( '#myCanvas' ).tagcanvas( {
            reverse: true,
            depth: 0.5,
            maxSpeed: 0.1,
            textFont: null,
            Size: 55,
            textColour: '#ffffff',
            weightMode: 'both',
            weight: true,
      }, 'tags' ) ) {
            $( '#myCanvasContainer' ).hide();
      }
} );