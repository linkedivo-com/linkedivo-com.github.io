const metaDescription=document.querySelector('meta[name="description"]'),app=document.getElementById("app"),loader=document.querySelector(".loader-wrapper");let isBusinessNameValid,username="",businessInfo,businessesList,countries=[],cities=[],categories=[],searchFilter="",defaultBusinessCards,defaultCheckBox,categoriesDrobDownVar,locationsDrobDownVar;async function renderPage(e){switch(e){case"/":homePage();break;case"/businesses-explorer":fetchBusinessExplorer();break;default:await businessUsernamesChecker(e)}}function navigate(){let e=window.location.pathname.toLowerCase();renderPage(e)}async function fetchBusinessInformation(){let e;try{let s=await fetch(`resources/businesses/${username}/information/en.json`);s?e=await s.json():console.log("we have error"),businessInfo=e,businessPageMaker()}catch(a){return a}businessPageMaker()}function businessPageMaker(){app.innerHTML=`
      <main class="main-business" id="main-business">
        <!-- header -->
        <div class="header-content">
          <figure class="header-profile">
            <img
              class="header-profile-logo"
              src="resources/images/logo-profile.svg"
              alt="linkedivo"
            />
            <figcaption>
              <h1 class="business-name">Linkedivo</h1>
              <h2 class="business-field">Where Connection Happen</h2>
            </figcaption>
          </figure>

          <div class="header-contact">
            <div class="contact-item">
              <i class="fa fa-map-marker-alt"></i>
              <p class="header-info-location">Canada | Toronto</p>
            </div>
            <div class="contact-item">
              <i class="fa fa-globe"></i>
              <a class="header-info-website" href="https://linkedivo.com"
                >www.linkedivo.com</a
              >
            </div>
            <div class="contact-item">
              <i class="fa fa-phone"></i>
              <a class="header-info-phone" href="tel:+12137720805"
                >+1 213 772 0805</a
              >
            </div>
            <div class="contact-item">
              <i class="fa fa-envelope"></i>
              <a class="header-info-email" href="mailto:info@linkedivo.com"
                >info@linkedivo.com</a
              >
            </div>
          </div>
          <div class="header-tools">
            <div class="header-qr-code">
              <img
                class="header-qr-code-img"
                src="resources/businesses/navan/images/navan-qr-code.svg"
                alt="linkedivo qr code"
              />
            </div>
            <div class="header-quick-access">
              <i class="fa fa-bookmark"></i>
              <!-- <i class="fa-regular fa-bookmark"></i> -->
              <i class="fa fa-share-alt"></i>
              <i class="fa fa-user-plus"></i>
            </div>
          </div>
        </div>

        <!-- business nav -->
        <nav class="business-nav">
          <ul>
            <li class="nav-overview header-nav-selected">
              <a href="#">Overview</a>
            </li>
            <li class="nav-services">
              <a href="#">Services</a>
            </li>
            <li class="nav-contact">
              <a href="#">Contact</a>
            </li>
            <li class="nav-gallery">
              <a href="#">Gallery</a>
            </li>
            <li class="nav-more-info">
              <a href="#">More Info</a>
            </li>
          </ul>
        </nav>

        <!-- main content -->
        <div class="main-contents">
          <!-- overview -->
          <div class="main-overview"></div>

          <!-- services -->
          <div class="main-services"></div>

          <!-- contacts -->
          <div class="main-contacts">
            <div class="contact-info box-shadow">
              <div class="contact-info-details">
                <h3 class="office-title">Main Office</h3>
              </div>

              <div class="contact-info-map">
                <iframe
                  src=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <!-- Gallery -->
          <div class="main-gallery"></div>

          <!-- More Info -->
          <div class="main-more-info"></div>
        </div>
      </main>`;let e=document.querySelector(".header-profile-logo"),s=document.querySelector(".business-name"),a=document.querySelector(".business-field"),i=document.querySelector(".header-info-location"),t=document.querySelector(".header-info-website"),n=document.querySelector(".header-info-phone"),o=document.querySelector(".header-info-email"),r=document.querySelector(".header-qr-code-img"),l=document.querySelector(".main-overview"),c=document.querySelector(".main-services"),d=document.querySelector(".contact-info-details"),u=document.querySelector(".contact-info-map iframe"),f=document.querySelector(".main-gallery"),v=document.querySelector(".main-more-info"),p=document.querySelector(".fa-user-plus");metaDescription.setAttribute("content",businessInfo.info.metaDescription),document.title=`${businessInfo.info.name} | ${businessInfo.info.slogan}`,s.innerHTML=businessInfo.info.name,e.setAttribute("src",`resources/businesses/${username}/images/${username}-logo.png`),e.setAttribute("alt",`${businessInfo.info.name} logo`),a.innerHTML=businessInfo.info.slogan,i.innerHTML=`${businessInfo.info.country} | ${businessInfo.info.city}`,t.setAttribute("href",businessInfo.info.url),t.innerHTML=`www.${businessInfo.info.url.split("//")[1]}`,o.setAttribute("href",`mailto:${businessInfo.info.email}`),o.innerHTML=businessInfo.info.email,n.setAttribute("href",`tel:${businessInfo.info.phone}`),n.innerHTML=businessInfo.info.phone,r.setAttribute("src",`resources/businesses/${username}/images/${username}-qr-code.svg`),r.setAttribute("alt",`${businessInfo.info.name} QR code`),addToContactFunc(p,businessInfo.info.name,businessInfo.info.email,`https://linkedivo.com/${businessInfo.info.userName}`,businessInfo.info.phone);let y=document.querySelector(".fa-share-alt");y.addEventListener("click",function(){modalShareInfoHandler(`https://linkedivo.com/${businessInfo.info.userName}`)});let h=document.querySelector(".fa-bookmark");h.addEventListener("click",function(){notification("This option will be available in next version")}),businessNavMaker(),businessInfo.overview.mission&&(l.innerHTML+=`<div class="overview-card details-card box-shadow">
            <h2 class="summary-title">Executive Summary</h2>
            <p class="summary-description">
            ${businessInfo.overview.summary}
            </p>
            </div>`),businessInfo.overview.mission&&(l.innerHTML+=`
            <div class="overview-card details-card box-shadow">
            <h2 class="mission-title">Mission</h2>
            <p class="mission-description">
            ${businessInfo.overview.mission}
            </p>
            </div>`),businessInfo.overview.vision&&(l.innerHTML+=`
            <div class="overview-card details-card box-shadow">
            <h2 class="vision-title">Vision</h2>
            <p class="vision-description">
            ${businessInfo.overview.vision}
            </p>
            </div>`),businessInfo.overview.values&&(l.innerHTML+=`
            <div class="overview-card details-card box-shadow">
            <h2 class="values-title">Values</h2>
            <p class="values-description">
            ${businessInfo.overview.values}
            </p>
            </div>`),Object.keys(businessInfo.services).forEach(e=>{c.innerHTML+=`<div class="service-card box-shadow">
            <div class="service-info">
                <h3>${businessInfo.services[e].title}</h3>
                <p>
                    ${businessInfo.services[e].description};
                </p>
            </div>
            <div class="service-img">
                <img src='resources/businesses/${username}/images/${e}.svg' alt="${username}-${businessInfo.services[e].title}" />
            </div>
        </div>`}),businessInfo.contacts.address&&(d.innerHTML+=`
          <div class="contacts-address info-details-card">
                <i class="fa fa-map-marker-alt"></i>
                <p>${businessInfo.contacts.address}</p>
              </div>`),businessInfo.contacts.phone&&(d.innerHTML+=`
            <div class="contacts-phone info-details-card">
        <i class="fa fa-phone"></i>
        <a href="tel:${businessInfo.contacts.phone}">${businessInfo.contacts.phone}</a>
    </div>`),businessInfo.contacts.website&&(d.innerHTML+=`
              <div class="contacts-phone info-details-card">
                <i class="fa fa-globe"></i>
                <a href="${businessInfo.contacts.website}">www.${businessInfo.contacts.website.split("//")[1]}</a>
              </div>`),businessInfo.contacts.email&&(d.innerHTML+=`
              <div class="contacts-email info-details-card">
                <i class="fa fa-envelope"></i>
                <a href="mailto:${businessInfo.contacts.email}">${businessInfo.contacts.email}</a>
              </div>`),businessInfo.contacts.socialMedia&&(d.innerHTML+='<div class="contacts-social-media info-details-card"></div>');let b=document.querySelector(".contacts-social-media");businessInfo.contacts.socialMedia.instagram&&(b.innerHTML+=`
              <a href="${businessInfo.contacts.socialMedia.instagram}">
                  <i class="fab fa-instagram"></i>
                </a>`),businessInfo.contacts.socialMedia.facebook&&(b.innerHTML+=`
              <a href="${businessInfo.contacts.socialMedia.facebook}">
                  <i class="fab fa-facebook"></i>
                </a>`),businessInfo.contacts.socialMedia.linkedin&&(b.innerHTML+=`
              <a href="${businessInfo.contacts.socialMedia.linkedin}">
                  <i class="fab fa-linkedin"></i>
                </a>`),businessInfo.contacts.socialMedia.whatsapp&&(b.innerHTML+=`
              <a href="${businessInfo.contacts.socialMedia.whatsapp}">
                  <i class="fab fa-whatsapp"></i>
                </a>`),businessInfo.contacts.socialMedia.telegram&&(b.innerHTML+=`
              <a href="${businessInfo.contacts.socialMedia.telegram}">
                  <i class="fab fa-telegram"></i>
                </a>`),businessInfo.contacts.socialMedia.youtube&&(b.innerHTML+=`
              <a href="${businessInfo.contacts.socialMedia.youtube}">
                  <i class="fab fa-youtube"></i>
                </a>`),businessInfo.contacts.socialMedia.twitter&&(b.innerHTML+=`
              <a href="${businessInfo.contacts.socialMedia.twitter}">
                  <i class="fab fa-twitter"></i>
                </a>`),businessInfo.contacts.googleMap&&u.setAttribute("src",businessInfo.contacts.googleMap),Object.keys(businessInfo.gallery).forEach(e=>{f.innerHTML+=`        
        <div class="gallery-card box-shadow">
            <div class="gallery-info">
              <h3>${businessInfo.gallery[e].title}</h3>
              <p>
               ${businessInfo.gallery[e].description}
              </p>
            </div>
            <div class="gallery-img">
                <img src='resources/businesses/${username}/images/${e}.svg' alt="${username}-${businessInfo.gallery[e].title}" /> 
            </div>
          </div>`}),Object.keys(businessInfo.moreInfo).forEach(e=>{v.innerHTML+=`   
         <div class="more-info-card">
            <a href="${businessInfo.moreInfo[e].link}"
            >- ${businessInfo.moreInfo[e].title}</a>
        </div>`})}function businessNavMaker(){let e=document.querySelector(".nav-overview"),s=document.querySelector(".nav-services"),a=document.querySelector(".nav-contact"),i=document.querySelector(".nav-gallery"),t=document.querySelector(".nav-more-info"),n=document.querySelector(".main-overview"),o=document.querySelector(".main-services"),r=document.querySelector(".main-contacts"),l=document.querySelector(".main-gallery"),c=document.querySelector(".main-more-info");n.style.display="block",o.style.display="none",r.style.display="none",l.style.display="none",c.style.display="none",e.classList.add("header-nav-selected"),s.classList.remove("header-nav-selected"),a.classList.remove("header-nav-selected"),i.classList.remove("header-nav-selected"),t.classList.remove("header-nav-selected"),e.addEventListener("click",d=>{d.preventDefault(),n.style.display="block",o.style.display="none",r.style.display="none",l.style.display="none",c.style.display="none",e.classList.add("header-nav-selected"),s.classList.remove("header-nav-selected"),a.classList.remove("header-nav-selected"),i.classList.remove("header-nav-selected"),t.classList.remove("header-nav-selected")}),s.addEventListener("click",d=>{d.preventDefault(),n.style.display="none",o.style.display="block",r.style.display="none",l.style.display="none",c.style.display="none",e.classList.remove("header-nav-selected"),s.classList.add("header-nav-selected"),a.classList.remove("header-nav-selected"),i.classList.remove("header-nav-selected"),t.classList.remove("header-nav-selected")}),a.addEventListener("click",d=>{d.preventDefault(),n.style.display="none",o.style.display="none",r.style.display="block",l.style.display="none",c.style.display="none",e.classList.remove("header-nav-selected"),s.classList.remove("header-nav-selected"),a.classList.add("header-nav-selected"),i.classList.remove("header-nav-selected"),t.classList.remove("header-nav-selected")}),i.addEventListener("click",d=>{d.preventDefault(),n.style.display="none",o.style.display="none",r.style.display="none",l.style.display="block",c.style.display="none",e.classList.remove("header-nav-selected"),s.classList.remove("header-nav-selected"),a.classList.remove("header-nav-selected"),i.classList.add("header-nav-selected"),t.classList.remove("header-nav-selected")}),t.addEventListener("click",d=>{d.preventDefault(),n.style.display="none",o.style.display="none",r.style.display="none",l.style.display="none",c.style.display="block",e.classList.remove("header-nav-selected"),s.classList.remove("header-nav-selected"),a.classList.remove("header-nav-selected"),i.classList.remove("header-nav-selected"),t.classList.add("header-nav-selected")})}async function fetchBusinessExplorer(){let e;try{let s=await fetch("resources/businesses/general/businessesList.json");s?e=await s.json():console.log("we have error"),businessesList=e,explorerPageMaker()}catch(a){return a}}function explorerPageMaker(){app.innerHTML=`
    <!-- main -->
    <main class="explorer-main-business" id="main-business">
      <div class="explorer-title-heading">
        <h2>Business Explorer</h2>
        <div class="explorer-search-field">
        <div class="explorer-filter">
          <div class="filter-country box-shadow filter-card">
            <div  class="filter-selector">
            <span data-type="country">All Countries</span>
            <i class="fa fa-angle-down"></i>
            </div>
            <div class="dropdown-content box-shadow"></div>
          </div>
          <div class="filter-city box-shadow filter-card">
            <div  class="filter-selector">
            <span data-type="city">All Cities</span>
            <i class="fa fa-angle-down"></i>
            </div>
            <div class="dropdown-content box-shadow"></div>

          </div>
          <div class="filter-category box-shadow filter-card">
            <div class="filter-selector">
            <span data-type="category">All Categories</span>
            <i class="fa fa-angle-down"></i>
            </div>
            <div class="dropdown-content box-shadow"> </div>
          </div>
        </div>
        
        <input class="search-box box-shadow" type="text" placeholder="Search..." />
      </div>


      </div>
      <div class="business-lists">
      </div>
    </main>`;let e=document.querySelector(".business-lists"),s=document.querySelector(".explorer-search-field input"),a=document.querySelector(".filter-country  .dropdown-content "),i=document.querySelector(".filter-city .dropdown-content "),t=document.querySelector(".filter-category .dropdown-content "),n=document.querySelector(".search-box");n.value=searchFilter;let o=document.querySelectorAll(".filter-card .filter-selector ");async function r(){let e;try{let s=await fetch("resources/businesses/general/categories.json");s?e=await s.json():console.log("we have error"),(categoriesDrobDownVar=e).categories.forEach(e=>{t.innerHTML+=`
        <label>
        <span> ${e.title}</span>
        <input type="checkbox" value="${e.slug}" data-type="category">
        </label>`})}catch(a){return a}}async function l(){let e;try{let s=await fetch("resources/businesses/general/locations.json");s?e=await s.json():console.log("we have error"),(locationsDrobDownVar=e).countries.forEach(e=>{a.innerHTML+=`
          <label>
            <span > ${e.title}</span>
            <input type="checkbox" value="${e.slug}" data-type="country">
          </label>`,e.subcategories.forEach(e=>{i.innerHTML+=`
          <label>
            <span > ${e.title}</span>
            <input type="checkbox" value="${e.slug}" data-type="city">
          </label>  `})})}catch(t){return t}let n=document.querySelectorAll(".explorer-business-card"),o=document.querySelectorAll(".dropdown-content label input"),r=document.querySelectorAll(".filter-selector > span");defaultBusinessCards=n,o.forEach(e=>{e.addEventListener("click",function(e){e.stopPropagation(),filterUpdater(defaultBusinessCards,defaultCheckBox=e.target,searchFilter),filterTitleUpdater(o,r),filterDropdownCityUpdater()})})}function c(e,s){e.style.display="none",s&&(s.classList.add("fa-angle-down"),s.classList.remove("fa-angle-up"))}function d(e){let s=document.querySelectorAll(".dropdown-content"),a=document.querySelectorAll(".filter-card .fa");s.forEach(s=>{s!==e&&c(s)}),a.forEach(e=>e.classList.add("fa-angle-down")),a.forEach(e=>e.classList.remove("fa-angle-up"))}Object.keys(businessesList).forEach(s=>{e.innerHTML+=`
    <div class="explorer-business-card box-shadow" data-name="${businessesList[s].name}" data-country="${businessesList[s].country}" data-city="${businessesList[s].city}" data-categories="${businessesList[s].categories}" data-username="${businessesList[s].userName}">
      <div class="explorer-card-container">
        <div class="explorer-profile">
          <div class="explorer-logo">
            <img
              src="${businessesList[s].logo}"
              alt="${businessesList[s].name} logo"
            />
          </div>
          <div class="explorer-title">
            <h3>${businessesList[s].name} </h3>
            <h4>${businessesList[s].title}</h4>
          </div>
        </div>
        <p>${businessesList[s].metaDescription}
        </p>
        <div class="explorer-country">${businessesList[s].country} | ${businessesList[s].city}</div>
      </div>
      <div class="explorer-button">
        <button>Explore More</button>
      </div>
    </div>
    `}),allBusinessesCard=document.querySelectorAll(".explorer-business-card"),s.addEventListener("keyup",e=>{filterUpdater(defaultBusinessCards,defaultCheckBox,searchFilter=e.target.value.trim().toLowerCase())}),filterUpdater(allBusinessesCard,defaultCheckBox,searchFilter),allBusinessesCard.forEach(e=>{e.querySelector(".explorer-button").addEventListener("click",function(s){console.log(s),history.pushState(null,null,`/${e.dataset.username}`),renderPage(`/${e.dataset.username}`)})}),r(),l(),o.forEach(e=>{e.addEventListener("click",function(e){var s,a;e.stopPropagation();let i=e.target.closest(".filter-card").querySelector(".dropdown-content"),t=e.target.querySelector(".fa");"flex"===i.style.display?c(i,t):(d(i),s=i,a=t,s.style.display="flex",a&&(a.classList.add("fa-angle-up"),a.classList.remove("fa-angle-down")))})}),document.addEventListener("click",function(e){let s=e.target.closest(".filter-card");s||d(null)})}function homePage(){app.innerHTML=`
 <main class="home-main-business" id="main-business">
      <div class="home-logo">
        <img
          src="resources/images/linkedivo-logo-dark.svg"
          alt="Linkedivo logo"
        />
      </div>
      <div class="home-search">
        <form action="#" class="home-form-explore">
          <i class="fa fa-search"></i>
          <input type="search" placeholder="Type here..." />
          <button>Explore</button>
        </form>
      </div>
            <h1 class="home-slogan">Where connection Happen</h1>

    </main>`;let e=document.querySelector(".home-form-explore"),s=document.querySelector(".home-search button"),a=document.querySelector(".home-form-explore input");s.addEventListener("click",function(e){e.preventDefault(),searchFilter=a.value,history.pushState(null,null,"/businesses-explorer"),renderPage("/businesses-explorer")}),e.addEventListener("submit",function(e){e.preventDefault(),searchFilter=a.value.trim().toLowerCase(),console.log(a.value),console.log(searchFilter),history.pushState(null,null,"/businesses-explorer"),renderPage("/businesses-explorer")}),a.focus()}async function businessUsernamesChecker(e){let s,a;try{let i=await fetch("resources/businesses/general/businessUsernames.json");i?(s=await i.json(),username=e.split("/")[1],(a=s.usernames.includes(username))?fetchBusinessInformation():(app.innerHTML="<h5>Page Not Found   |   Error 404   |   Code-012</h5>",console.log("code for 404 is here"))):console.log("We have error")}catch(t){return t}}function filterUpdater(e,s,a){let i=e,t=s,n=a;t&&(t.checked?("country"===t.dataset.type&&countries.push(t.value),"city"===t.dataset.type&&cities.push(t.value),"category"===t.dataset.type&&categories.push(t.value)):t.checked||("country"===t.dataset.type&&(countries=countries.filter(e=>e!==t.value)),"city"===t.dataset.type&&(cities=cities.filter(e=>e!==t.value)),"category"===t.dataset.type&&(categories=categories.filter(e=>e!==t.value)))),i.forEach(e=>{e.style.display="flex"}),(countries.length>0||cities.length>0||categories.length>0)&&(i.forEach(e=>{e.style.display="none"}),i.forEach(e=>{countries.length>0&&countries.forEach(s=>{e.dataset.country.toLowerCase().trim()===s.toLowerCase().trim()&&(e.style.display="flex")}),cities.length>0&&cities.forEach(s=>{e.dataset.city.toLowerCase().trim()===s.toLowerCase().trim()&&(e.style.display="flex")}),categories.length>0&&categories.forEach(s=>{e.dataset.category===s&&(e.style.display="flex")})})),i.forEach(e=>{if("none"!==getComputedStyle(e).display){let s=e.dataset.name.toLowerCase(),a=s.includes(n);a?e.style.display="flex":e.style.display="none"}})}function filterTitleUpdater(e,s){let a=!1,i=!1,t=!1;e.forEach(e=>{"country"===e.dataset.type&&e.checked&&(a=!0),"city"===e.dataset.type&&e.checked&&(i=!0),"category"===e.dataset.type&&e.checked&&(t=!0)}),s.forEach(e=>{"country"===e.dataset.type.toLowerCase().trim()&&a?e.innerHTML="Selected":"country"===e.dataset.type.toLowerCase().trim()&&(e.innerHTML="All Countries"),"city"===e.dataset.type.toLowerCase().trim()&&i?e.innerHTML="Selected":"city"===e.dataset.type.toLowerCase().trim()&&(e.innerHTML="All Cities"),"category"===e.dataset.type.toLowerCase().trim()&&t?e.innerHTML="Selected":"category"===e.dataset.type.toLowerCase().trim()&&(e.innerHTML="All Categories")})}function filterDropdownCityUpdater(){let e=document.querySelector(".filter-city .dropdown-content");e.innerHTML="",locationsDrobDownVar.countries.forEach((s,a)=>{countries.forEach(s=>{s===locationsDrobDownVar.countries[a].slug&&locationsDrobDownVar.countries[a].subcategories.forEach((s,i)=>{e.innerHTML+=`
              <label>
                <span > ${locationsDrobDownVar.countries[a].subcategories[i].title}</span>
                <input type="checkbox" value="${locationsDrobDownVar.countries[a].subcategories[i].slug}" data-type="city">
              </label>  `})})}),0===countries.length&&locationsDrobDownVar.countries.forEach((s,a)=>{locationsDrobDownVar.countries[a].subcategories.forEach((s,i)=>{e.innerHTML+=`
              <label>
                <span > ${locationsDrobDownVar.countries[a].subcategories[i].title}</span>
                <input type="checkbox" value="${locationsDrobDownVar.countries[a].subcategories[i].slug}" data-type="city">
              </label>  `})})}function addToContactFunc(e,s,a,i,t){e.addEventListener("click",()=>{let e=s.replace(/[<>:"/\\|?*]/g,""),n=e.substring(0,255),o={name:n,email:a,phoneNumber:t,website:i},r=`BEGIN:VCARD
VERSION:3.0
FN:${o.name}
EMAIL:${o.email}
TEL:${o.phoneNumber}
URL:${o.website}
END:VCARD`,l=new Blob([r],{type:"text/vcard"}),c=document.createElement("a");c.href=window.URL.createObjectURL(l),c.download=n+".vcf",c.click()})}window.onload=function(){loader.style.display="none"},window.addEventListener("popstate",navigate),navigate();const navLogoLink=document.querySelector(".nav-logo");navLogoLink.addEventListener("click",function(){history.pushState(null,null,"/"),renderPage("/")});const headerBusinessExplorerButton=document.querySelector(".header-business-explorer");function modalShareInfoHandler(e){let s=document.getElementById("myModal"),a=document.querySelector(".modal-content input"),i=document.getElementsByClassName("close")[0],t=document.getElementById("copyBtn"),n=document.getElementById("copyLinkInput");s.style.display="flex",a.value=e,i.onclick=function(){s.style.display="none"},window.onclick=function(e){e.target==s&&(s.style.display="none")},t.onclick=function(){n.select(),document.execCommand("copy"),s.style.display="none",notification("Link copied!")}}headerBusinessExplorerButton.addEventListener("click",function(){history.pushState(null,null,"/businesses-explorer"),renderPage("/businesses-explorer")});const notif=document.querySelector(".notifications");function notification(e){notif.innerHTML=e,notif.style.display="flex",setInterval(()=>{notif.style.display="none"},2e3)}