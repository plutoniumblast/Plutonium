// MANAV SEKSARIA
anime.timeline()
      .add( {
            targets: '.ml5 .line',
            opacity: [ 0.5, 1 ],
            scaleX: [ 0, 1 ],
            easing: "easeInOutExpo",
            duration: 700
      } ).add( {
            targets: '.ml5 .line',
            duration: 600,
            easing: "easeOutExpo",
            translateY: ( el, i ) => ( -0.625 + 0.625 * 2 * i ) + "em"
      } ).add( {
            targets: '.ml5 .letters-left',
            opacity: [ 0, 1 ],
            translateX: [ "0.5em", 0 ],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=300'
      } ).add( {
            targets: '.ml5 .letters-right',
            opacity: [ 0, 1 ],
            translateX: [ "-0.5em", 0 ],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=600'
      } ).add( {
            targets: '.ml5 .line',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 100
      } );

// FULL STACK DEV
var textWrapper = document.querySelector( '.ml11 .letters' );
textWrapper.innerHTML = textWrapper.textContent.replace( /([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>" );

anime.timeline()
      .add( {
            targets: '.ml11 .line',
            scaleY: [ 0, 1 ],
            opacity: [ 0.5, 1 ],
            easing: "easeOutExpo",
            duration: 700
      } )
      .add( {
            targets: '.ml11 .line',
            translateX: [ 0, document.querySelector( '.ml11 .letters' ).getBoundingClientRect().width + 10 ],
            easing: "easeOutExpo",
            duration: 700,
            delay: 100
      } ).add( {
            targets: '.ml11 .letter',
            opacity: [ 0, 1 ],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=775',
            delay: ( el, i ) => 34 * ( i + 1 )
      } ).add( {
            targets: '.ml11 .line',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 100
      } );


var textWrapper = document.querySelector( '.ml12' );
textWrapper.innerHTML = textWrapper.textContent.replace( /\S/g, "<span class='letter'>$&</span>" );

anime.timeline()
      .add( {
            targets: '.ml12 .letter',
            translateX: [ 40, 0 ],
            translateZ: 0,
            opacity: [ 0, 1 ],
            easing: "easeOutExpo",
            duration: 1200,
            delay: ( el, i ) => 500 + 30 * i
      } ).add( {
            targets: '.ml12 .letter',
            opacity: 1,
            easing: "easeInExpo",
            duration: 1100,
            delay: ( el, i ) => 100 + 30 * i
      } );


// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————
class TextScramble {
      constructor ( el ) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind( this );
      }

      setText ( newText ) {
            const oldText = this.el.innerText;
            const length = Math.max( oldText.length, newText.length );
            const promise = new Promise( resolve => this.resolve = resolve );
            this.queue = [];

            for ( let i = 0;i < length;i++ ) {
                  const from = oldText[ i ] || '';
                  const to = newText[ i ] || '';
                  const start = Math.floor( Math.random() * 40 );
                  const end = start + Math.floor( Math.random() * 40 );
                  this.queue.push( {
                        from,
                        to,
                        start,
                        end
                  } );
            }

            cancelAnimationFrame( this.frameRequest );
            this.frame = 0;
            this.update();
            return promise;
      }

      update () {
            let output = '';
            let complete = 0;

            for ( let i = 0, n = this.queue.length;i < n;i++ ) {
                  let {
                        from,
                        to,
                        start,
                        end,
                        char
                  } = this.queue[ i ];

                  if ( this.frame >= end ) {
                        complete++;
                        output += to;
                  } else if ( this.frame >= start ) {
                        if ( !char || Math.random() < 0.28 ) {
                              char = this.randomChar();
                              this.queue[ i ].char = char;
                        }

                        output += `<span class="dud">${ char }</span>`;
                  } else {
                        output += from;
                  }
            }

            this.el.innerHTML = output;

            if ( complete === this.queue.length ) {
                  this.resolve();
            } else {
                  this.frameRequest = requestAnimationFrame( this.update );
                  this.frame++;
            }
      }

      randomChar () {
            return this.chars[ Math.floor( Math.random() * this.chars.length ) ];
      }

} // ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————


const phrases = [ 'Neo,', 'Sooner or Later', 'You\'re going to realize', 'Just as I did', 'that there\'s a Difference', 'between Knowing the path', 'and Walking the path.' ];
const el = document.querySelector( '.text' );
const fx = new TextScramble( el );
let counter = 0;

const next = () => {
      fx.setText( phrases[ counter ] ).then( () => {
            setTimeout( next, 800 );
      } );
      counter = ( counter + 1 ) % phrases.length;
};

next();