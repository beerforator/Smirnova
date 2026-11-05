import React, {useEffect,useRef} from 'react';
import './expert-profile.css';
const profile='https://www.cmwp.ru/team/5792/';
const award='https://www.cmwp.ru/news/marinasmirnovanagrazhdenablagodarstvennympismomotmeramoskvy/';
const market='https://www.cmwp.ru/news/stagnatsiya-pokazateley-zagruzki-i-dokhodnosti-na-nomer-na-rynke-kachestvennykh-oteley-v-2025-g/';
export function Identification(){return <div className="expert-identification"><p className="expert-role">Партнер CMWP.<br/>Руководитель департамента<br/>гостиничного бизнеса и туризма.</p><p className="expert-focus">Развитие гостиничных и туристских территорий, инвестиционный консалтинг и курортная недвижимость.</p><div className="expert-tags"><span>В отрасли с 1993</span><span>RICS с 2011</span></div></div>}
export function ExpertOverview(){return <section className="expert-overview" aria-labelledby="expert-figures"><h2 id="expert-figures">Опыт в цифрах</h2><div className="expert-figures">{[['300+','проектов под руководством и с непосредственным участием'],['30+','лет профессионального опыта'],['10+','книг и методических пособий'],['2013','год начала руководства направлением CMWP']].map(([n,t])=><div key={n}><strong>{n}</strong><p>{t}</p></div>)}</div><div className="expert-competencies"><h3>Профессиональные<br/>компетенции</h3><ul>{['Стратегии развития территорий','Гостиничная недвижимость','Концепции курортных проектов','Инвестиционный консалтинг','Финансовое моделирование','Переговоры с гостиничными операторами'].map(t=><li key={t}>{t}</li>)}</ul></div></section>}
export function ProfessionalProfile(){return <section className="professional-profile" id="about"><div className="expert-section-heading"><h2>Профессиональный<br/>путь</h2><p>Государственный сектор, международный консалтинг и девелопмент туристских территорий.</p></div><div className="expert-career">{[['1993','Начало работы в отрасли','Комитет по туризму Российской Федерации, затем государственные структуры гостинично-туристской отрасли.'],['2005','Международный консалтинг','Гостиничная недвижимость и туристские кластеры. Опыт руководящих должностей в Colliers International и Jones Lang LaSalle Hotels.'],['2013','Руководство направлением CMWP','Стратегии комплексного развития, программы ГЧП в туризме и крупные курортные проекты.']].map(([year,title,text])=><div key={year}><span>{year}</span><h3>{title}</h3><p>{text}</p></div>)}</div><div className="expert-recognition"><h2>Признание<br/>и участие</h2><div className="recognition-list"><article><span className="recognition-mark">RICS</span><div><h3>Профессиональное членство с 2011 года</h3><p>Royal Institution of Chartered Surveyors — Королевское общество сертифицированных специалистов в области недвижимости.</p><a href={profile} target="_blank" rel="noreferrer">Профиль CMWP</a></div></article><article><span className="recognition-mark">2022</span><div><h3>Благодарственное письмо мэра Москвы</h3><p>Сергей Собянин отметил вклад Марины в развитие гостиничной отрасли столицы, ее профессионализм и многолетнюю работу.</p><a href={award} target="_blank" rel="noreferrer">Публикация CMWP · 17 ноября 2022</a></div></article><article><span className="recognition-mark recognition-letters">РСПП</span><div><h3>Отраслевой диалог и образование</h3><p>Член Совета по туризму РСПП. Спикер и модератор профессиональных мероприятий, включая отраслевые комитеты Совета Федерации и РСПП. Автор аналитических материалов и лектор московских вузов.</p><a href={award} target="_blank" rel="noreferrer">Об экспертной деятельности</a></div></article></div></div></section>}
function blobPath(x=0,y=0){
 const base=[[100,20],[520,5],[930,65],[990,340],[950,750],[780,970],[400,990],[60,900],[5,500]];
 const points=base.map(([px,py],i)=>{
  const proximity=Math.max(0,1-Math.hypot(px/1000-(x+1)/2,py/1000-(y+1)/2)/.9);
  return [px+x*(14+40*proximity)+y*15*Math.sin(i*1.7),py+y*(14+35*proximity)+x*22*Math.cos(i*1.5)];
 });
 // Closed Catmull–Rom spline: curved edges with a smooth tangent at every join.
 const at=i=>points[(i+points.length)%points.length];
 const pair=p=>p.map(v=>v.toFixed(2)).join(' ');
 let d=`M${pair(points[0])}`;
 for(let i=0;i<points.length;i++){
  const a=at(i-1),b=at(i),c=at(i+1),e=at(i+2);
  d+=` C${pair([b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6])} ${pair([c[0]-(e[0]-b[0])/6,c[1]-(e[1]-b[1])/6])} ${pair(c)}`;
 }
 return d+' Z';
}
function OrganicPanel({children}){
 const path=useRef(null),motion=useRef({x:0,y:0,toX:0,toY:0,frame:0});
 useEffect(()=>()=>cancelAnimationFrame(motion.current.frame),[]);
 const animate=()=>{
  const m=motion.current;
  m.x+=(m.toX-m.x)*.11;m.y+=(m.toY-m.y)*.11;
  const moving=Math.abs(m.toX-m.x)+Math.abs(m.toY-m.y)>.002;
  if(!moving){m.x=m.toX;m.y=m.toY}
  path.current?.setAttribute('d',blobPath(m.x,m.y));
  m.frame=moving?requestAnimationFrame(animate):0;
 };
 const target=(x,y)=>{const m=motion.current;m.toX=x;m.toY=y;if(!m.frame)m.frame=requestAnimationFrame(animate)};
 const follow=e=>{
  if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const r=e.currentTarget.getBoundingClientRect();
  target(Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1)),Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1)));
 };
 return <div className="market-commentary organic-panel" onPointerMove={follow} onPointerLeave={()=>target(0,0)} onPointerCancel={()=>target(0,0)}><svg className="organic-shape" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><path ref={path} d={blobPath()}/></svg>{children}</div>
}
export function ExpertCommentary(){return <section className="expert-commentary" aria-labelledby="expert-commentary-title"><div className="expert-section-heading"><h2 id="expert-commentary-title">Экспертный<br/>взгляд</h2><p>Комментарии о гостиничном рынке, инвестициях в курорты и экономике проектов — в CRE, «Коммерсанте», «Ведомостях», РБК, ТАСС, «Известиях» и РИА Новости.</p></div><OrganicPanel><div className="market-caption"><span>CMWP · #MARKETBEAT</span><span>Итоги 2025 года · опубликовано 17 февраля 2026</span></div><h3>Качественные отели:<br/>цены растут, спрос охлаждается.</h3><div className="market-figures"><div><strong>76,7<span>%</span></strong><p>средняя загрузка<br/><small>−0,9 п.п. к 2024 году</small></p></div><div><strong>+3,3<span>%</span></strong><p>рост средней цены<br/>на номер</p></div><div><strong>+2,1<span>%</span></strong><p>рост доходности<br/>на номер</p></div></div><blockquote>«В 2026 г. отельеры будут пытаться компенсировать рост операционных расходов увеличением цен»<cite>Марина Смирнова · комментарий CMWP</cite></blockquote><a href={market} target="_blank" rel="noreferrer">Читать анализ рынка</a></OrganicPanel></section>}
