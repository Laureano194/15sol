(function () {
  "use strict";

  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-fh5co-nav-toggle").removeClass("active");
        }
      }
    });
  };

  var offcanvasMenu = function () {
    $("#page").prepend('<div id="fh5co-offcanvas" />');
    $("#page").prepend(
      '<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>'
    );
    var clone1 = $(".menu-1 > ul").clone();
    $("#fh5co-offcanvas").append(clone1);
    var clone2 = $(".menu-2 > ul").clone();
    $("#fh5co-offcanvas").append(clone2);

    $("#fh5co-offcanvas .has-dropdown").addClass("offcanvas-has-dropdown");
    $("#fh5co-offcanvas").find("li").removeClass("has-dropdown");

    // Hover dropdown menu on mobile
    $(".offcanvas-has-dropdown")
      .mouseenter(function () {
        var $this = $(this);

        $this.addClass("active").find("ul").slideDown(500, "easeOutExpo");
      })
      .mouseleave(function () {
        var $this = $(this);
        $this.removeClass("active").find("ul").slideUp(500, "easeOutExpo");
      });

    $(window).resize(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-fh5co-nav-toggle").removeClass("active");
      }
    });
  };

  var burgerMenu = function () {
    $("body").on("click", ".js-fh5co-nav-toggle", function (event) {
      var $this = $(this);

      if ($("body").hasClass("overflow offcanvas")) {
        $("body").removeClass("overflow offcanvas");
      } else {
        $("body").addClass("overflow offcanvas");
      }
      $this.toggleClass("active");
      event.preventDefault();
    });
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };

  var dropdown = function () {
    $(".has-dropdown")
      .mouseenter(function () {
        var $this = $(this);
        $this
          .find(".dropdown")
          .css("display", "block")
          .addClass("animated-fast fadeInUpMenu");
      })
      .mouseleave(function () {
        var $this = $(this);

        $this
          .find(".dropdown")
          .css("display", "none")
          .removeClass("animated-fast fadeInUpMenu");
      });
  };

  var testimonialCarousel = function () {
    var owl = $(".owl-carousel-fullwidth");
    owl.owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      responsiveClass: true,
      nav: false,
      dots: true,
      smartSpeed: 800,
      autoHeight: true,
    });
  };

  var goToTop = function () {
    $(".js-gotop").on("click", function (event) {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $("html").offset().top,
        },
        500,
        "easeInOutExpo"
      );

      return false;
    });

    $(window).scroll(function () {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $(".js-top").addClass("active");
      } else {
        $(".js-top").removeClass("active");
      }
    });
  };

  // Loading page
  var loaderPage = function () {
    $(".fh5co-loader").fadeOut("slow");
  };

  var counter = function () {
    $(".js-counter").countTo({
      formatter: function (value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };

  var counterWayPoint = function () {
    if ($("#fh5co-counter").length > 0) {
      $("#fh5co-counter").waypoint(
        function (direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" }
      );
    }
  };

  const moveArrow = () => {
    const flecha = document.querySelector(".elemento")
    let half = Math.ceil(window.innerWidth / 2)
    flecha.style.left = half + "px"
  }

  window.onload = moveArrow
  window.onresize = moveArrow

  // Parallax
  var parallax = function () {
    $(window).stellar();
  };

  // Formulario
  async function cargarInvitado(data) {
    let objInvitado = new Invitado()
    console.log(await objInvitado.add(data.asiste, data.nombre, data.cantidad, data.menu))
  }

  function validateForm(){
    if(!["S", "N"].includes(document.getElementById("asistencia").value)){
      document.getElementById("asistencia").style.border = "1px solid red"
      return false
    }
    return true
  }

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    if(validateForm()){
      let button = document.querySelector("#confirm_button")
      button.innerText = "Cargando ..."
      const data = Object.fromEntries(new FormData(e.target))
      cargarInvitado(data)
      .then(res => {
        button.innerText = "Confirmación cargada!"
        button.disabled = "true"})
      .catch(err => {
        button.innerText = "No se pudo enviar la confirmación. Intente luego."
        button.disabled = "true"})
    }})
  
	function guardarInvitacion() {
		console.log("entro")
	  $('form.form-newsletter input[type="submit"]').prop('disabled', true);
	  $('form.form-newsletter input[type="submit"]').val('LOADING');
	  NewsletterConfig.email = $('form.form-newsletter input.input-type').val();
	}


  // Firebase
  class Invitado {
    invitadosRef = db.collection("invitados");

    async add(asiste, nombre, cantidad, menu) {
      const invitado = { asiste, nombre, cantidad, menu };

      try {
        const docRef = await this.invitadosRef.add(invitado);
        console.log("User Added with ID: ", docRef.id);
        invitado.id = docRef.id;
      } catch (error) {
        console.error("Error Adding User: ", error);
      }
      return invitado;
    }

    async getAll() {
      const invitados = [];
      try {
        const snapshot = await this.invitadosRef.get();
        snapshot.forEach((doc) => invitados.push({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.error("Error Getting Invitados: ", error);
      }
      return invitados;
    }

    async get(id) {
      let invitado;
      try {
        let doc = await this.invitadosRef.doc(id).get();

        if (doc.exists) invitado = { id: doc.id, ...doc.data() };
        else console.log("No document found with id: ", id);
      } catch (error) {
        console.error("Error in getting invitado: ", error);
      }
      return invitado;
    }
  }

  async function main() {
    let test = new Invitado()
    console.log(await test.getAll())
  }

  $(function () {	
    mobileMenuOutsideClick();
    parallax();
    offcanvasMenu();
    burgerMenu();
    contentWayPoint();
    dropdown();
    testimonialCarousel();
    goToTop();
    loaderPage();
    counter();
    counterWayPoint();
    main();
  });
})();