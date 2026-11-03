import React, {useEffect, useRef, useState} from 'react';
import './gallery.css';
import {NewsCarousel} from './Interactions';
const works = [
  {name:'Шерегеш',region:'Кемеровская область',category:'Курортное развитие',image:'sheregesh.jpg',description:'Разработка концепции и технико-экономического обоснования второй очереди развития горнолыжного курорта. Подготовка проекта планировки территории и обновленной финансовой модели.',credit:'Вид территории · Aviasales'},
  {name:'Курильские острова',region:'Дальний Восток',category:'Туристский потенциал',image:'kurils.jpg',description:'Комплексная оценка туристского потенциала и систематизированное описание ресурсов Курильских островов. Предложения по развитию туристско-рекреационных территорий до 2025 года и технико-экономическое обоснование создания туристского кластера.',credit:'Вид территории · Vasta Expeditions'},
  {name:'Русская Палестина',region:'Истра, Московская область',category:'Концепция кластера',image:'istra.jpg',description:'Разработка маркетингового обоснования и концепции развития туристско-рекреационного кластера «Русская Палестина» в Истринском районе Московской области.',credit:'Вид территории · РБК Life'},
  {name:'Камбоджа / Вьетнам',region:'Юго-Восточная Азия',category:'Стратегия территории',image:'vietnam.jpg',description:'Разработка концепций комплексной застройки территорий в курортных зонах Камбоджи и Вьетнама. Подготовка инвестиционных меморандумов и финансовой модели для продажи курортной недвижимости по системе fractional ownership.',credit:'Вид побережья Вьетнама · iVIVU'}
];
function WorkDialog({work,onClose}) {
 const ref=useRef(null);
 useEffect(()=>{ref.current.showModal()},[]);
 return <dialog className="work-dialog" ref={ref} onCancel={onClose} onClose={onClose} aria-labelledby="work-name" onClick={e=>{if(e.target===e.currentTarget)onClose()}}><button className="dialog-close" onClick={onClose} autoFocus>Закрыть <span>×</span></button><img className="dialog-photo" src={'/images/'+work.image} alt={work.region}/><div className="dialog-copy"><span>{work.category} / {work.region}</span><h2 id="work-name">{work.name}</h2><p>{work.description}</p><small>{work.credit}. Фотография иллюстрирует место, не результат работы.</small></div></dialog>
}
function PortraitTransition({dock}){
 const ref=useRef(null);
 useEffect(()=>{let frame;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const target=dock.current;if(!target)return;const rect=target.getBoundingClientRect();const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const t=reduced?1:Math.min(1,Math.max(0,scrollY/(innerHeight*.82)));const el=ref.current;el.style.position=t>=1?'absolute':'fixed';el.style.width=`${innerWidth*(1-t)+rect.width*t}px`;el.style.height=`${innerHeight*(1-t)+rect.height*t}px`;el.style.right=`${(innerWidth-rect.right)*t}px`;el.style.top=`${t>=1?rect.top+scrollY:rect.top*t}px`;el.style.setProperty('--portrait-progress',t);el.style.setProperty('--portrait-angle',`${3*t}deg`);el.style.setProperty('--portrait-title',`${1-t*1.5}`);el.classList.toggle('settled',t>.98)})};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();return()=>{removeEventListener('scroll',update);removeEventListener('resize',update);cancelAnimationFrame(frame)}},[dock]);
 return <><div className="portrait-scroll-space"/><a ref={ref} className="portrait-transition" href="#about" aria-label="О Марине Смирновой"><img src="/images/marina.png" alt="Марина Смирнова"/><div className="portrait-opening-title">МАРИНА<br/>СМИРНОВА<span>Партнер CMWP</span></div></a></>
}
export default function Gallery(){
 const [active,setActive]=useState(null),[opened,setOpened]=useState(null);
 const dock=useRef(null);
 useEffect(()=>{document.title='Марина Смирнова — Избранные работы';document.body.classList.add('gallery-page');return()=>document.body.classList.remove('gallery-page')},[]);
 useEffect(()=>{if(opened!==null){const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}}},[opened]);
 return <div className={'gallery-site '+(active!==null?'is-previewing':'')} id="top">
  <div className="gallery-backdrop" aria-hidden="true">{works.map((w,i)=><img key={w.name} src={'/images/'+w.image} className={active===i?'shown':''} alt=""/>)}<div className="gallery-shade"/></div>
  <PortraitTransition dock={dock}/><div className="gallery-content">
   <header className="gallery-nav"><a className="gallery-wordmark" href="https://www.cmwp.ru/">CMWP<span>COMMONWEALTH PARTNERSHIP</span></a><nav><a href="#projects">Работы <sup>04</sup></a><a href="#about">Об эксперте</a><a href="mailto:marina.smirnova@cmwp.ru">Контакт</a></nav></header>
   <section className="gallery-intro"><div ref={dock} className="portrait-dock" aria-hidden="true"/><div className="gallery-title"><h1>МАРИНА<br/><span>СМИРНОВА</span></h1></div></section>
   <section className="work-grid" id="projects" aria-label="Галерея работ" onPointerLeave={()=>setActive(null)}>
    {works.map((w,i)=><button className={'work-tile work-tile-'+i+(active===i?' is-active':'')} key={w.name} onPointerEnter={e=>{if(e.pointerType!=='touch')setActive(i)}} onFocus={()=>setActive(i)} onBlur={()=>setActive(null)} onClick={()=>setOpened(i)} aria-label={'Открыть проект: '+w.name} aria-haspopup="dialog"><div className="work-photo"><img src={'/images/'+w.image} alt={w.region} loading={i>1?'lazy':'eager'}/><span className="work-index">0{i+1}</span><span className="work-open">Смотреть работу</span><span className="work-location">Вид территории</span></div><div className="work-caption"><h2>{w.name}</h2><span>{w.category}</span></div></button>)}
   </section>
   <section className="gallery-about" id="about"><div className="gallery-about-main"><h2>Профессиональный опыт</h2><div className="gallery-about-columns"><p>Марина Смирнова — партнер и руководитель департамента гостиничного бизнеса и туризма CMWP. Возглавляет направление с 2013 года.</p><p>Стратегии развития туристских территорий, исследования гостиничных рынков, концепции курортов и сопровождение инвестиционных решений.</p></div><div className="gallery-stat"><strong>300+</strong><p>проектов под руководством<br/>и с непосредственным участием</p></div><a className="gallery-bio-link" href="https://www.cmwp.ru/team/5792/" target="_blank" rel="noreferrer">Профессиональный опыт и публикации</a></div></section>
   <NewsCarousel/><footer className="gallery-footer" id="contact"><a href="mailto:marina.smirnova@cmwp.ru" className="gallery-email">Давайте<br/>поговорим<span>?</span></a><div><a href="mailto:marina.smirnova@cmwp.ru">marina.smirnova@cmwp.ru</a><a href="tel:+79854107237">+7 985 410 7237</a><span>Марина Смирнова / CMWP</span></div></footer>
  </div>{opened!==null&&<WorkDialog work={works[opened]} onClose={()=>setOpened(null)}/>}
 </div>
}
