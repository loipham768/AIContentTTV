export function generateInteractiveScripts(html: string): string {
  const parts: string[] = []

  const sliderRe = /id="(s[a-z0-9]{4,8})-wrap"/g
  let m: RegExpExecArray | null
  while ((m = sliderRe.exec(html)) !== null) {
    const sid = m[1]
    if (!html.includes(`id="${sid}-dots"`)) continue
    parts.push(
      `(function(){var wrap=document.getElementById('${sid}-wrap');if(!wrap)return;var track=document.getElementById('${sid}');var dots=Array.from(document.getElementById('${sid}-dots').querySelectorAll('button'));var cur=0,total=3,timer=null;function goTo(n){cur=(n%total+total)%total;track.scrollTo({left:cur*track.offsetWidth,behavior:'smooth'});dots.forEach(function(d,i){d.style.width=i===cur?'28px':'7px';d.style.background=i===cur?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.45)';});}dots.forEach(function(d,i){d.addEventListener('click',function(e){e.stopPropagation();goTo(i);resetTimer();});});function startTimer(){timer=setInterval(function(){goTo(cur+1);},4000);}function resetTimer(){clearInterval(timer);startTimer();}wrap.addEventListener('mouseenter',function(){clearInterval(timer);});wrap.addEventListener('mouseleave',startTimer);startTimer();track.addEventListener('scroll',function(){var idx=Math.round(track.scrollLeft/track.offsetWidth);if(idx!==cur){cur=idx;dots.forEach(function(d,i){d.style.width=i===cur?'28px':'7px';d.style.background=i===cur?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.45)';});}},{passive:true});})();`,
    )
  }

  const navRe = /<nav\b[^>]*id="(n[a-z0-9]{4,8})"[^>]*>/g
  while ((m = navRe.exec(html)) !== null) {
    const nid = m[1]
    if (!html.includes(`id="${nid}-toggle"`)) continue
    parts.push(
      `(function(){var nav=document.getElementById('${nid}');if(!nav)return;var toggle=document.getElementById('${nid}-toggle');var mobile=document.getElementById('${nid}-mobile');var menu=document.getElementById('${nid}-menu');nav.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var href=a.getAttribute('href');if(!href||href==="#")return;var target=document.querySelector(href);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}if(mobile&&mobile.style.display!=="none"){mobile.style.display="none";}});a.addEventListener('mouseenter',function(){a.style.background='#f1f5f9';a.style.color='#4f46e5';});a.addEventListener('mouseleave',function(){a.style.background='';a.style.color='';});});function checkBreak(){var sm=window.innerWidth<768;if(toggle)toggle.style.display=sm?'flex':'none';if(menu)menu.style.display=sm?'none':'flex';if(mobile&&!sm)mobile.style.display='none';}toggle&&toggle.addEventListener('click',function(){mobile.style.display=mobile.style.display==="none"?'block':'none';});checkBreak();window.addEventListener('resize',checkBreak);var links=Array.from(nav.querySelectorAll('a[href^="#"]'));window.addEventListener('scroll',function(){var scrollY=window.scrollY+80;var active=null;links.forEach(function(a){var t=document.querySelector(a.getAttribute('href'));if(t&&t.offsetTop<=scrollY)active=a;});links.forEach(function(a){a.style.color=a===active?'#4f46e5':'';a.style.fontWeight=a===active?'700':'';});},{passive:true});})();`,
    )
  }

  if (parts.length === 0) return ''
  return `<script>\n${parts.join('\n')}\n</script>`
}
