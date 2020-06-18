var date = new Date();
document.getElementById( 'time' ).innerHTML = date.getHours() % 12 + ":" + date.getMinutes();
console.log( date.getHours() % 12 + ":" + date.getMinutes() );

var shift = [ "AM", "PM" ]
if ( date.getHours() / 12 >= 1 ) {
      document.getElementById( 'shift' ).innerHTML = shift[ 1 ];
} else {
      document.getElementById( 'shift' ).innerHTML = shift[ 0 ];
}

var projects = [
      {
            Name: "Venugopalan Iyengar",
            post: "President",
      },
      {
            Name: "Vidit Parab",
            post: "Vice President",
      },
];


function List ( projects ) {
      return `
      <div class="sheet">
            <div class="example-2 card">
                  <div class="wrapper">
                        <div class="header">
                              <div class="date">
                                    <span class="month">Aug</span>
                                    <span class="year">2018</span>
                              </div>
                              <ul class="menu-content">
                                    <li><a href="#" class="fa fa-heart-o"><span>18</span></a></li>
                                    <li><a href="#" class="fa fa-comment-o"><span>3</span></a></li>
                              </ul>
                        </div>
                        <div class="data">
                              <div class="content">
                                    <span class="author">BITS Pilani</span>
                                    <h1 class="title"><a href="#">${projects.Name }</a></h1>
                                    <p class="text">Software Used: Node.js (Vue.js), WebGL (Three.js),
                                          Firebase, REST APIs, </p>
                                    <a href="#" class="button">Check it Out</a>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
      `
};

document.getElementById( "projects" ).innerHTML = `
      ${projects.map( List ).join( '' ) }`