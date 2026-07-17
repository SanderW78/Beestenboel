"use strict";
const DIEREN = [{"id":"hond","emoji":"🐕","naam":"Hond","cat":"dieren"},{"id":"haan","emoji":"🐓","naam":"Haan","cat":"dieren"},{"id":"varken","emoji":"🐖","naam":"Varken","cat":"dieren"},{"id":"koe","emoji":"🐄","naam":"Koe","cat":"dieren"},{"id":"kikker","emoji":"🐸","naam":"Kikker","cat":"dieren"},{"id":"kat","emoji":"🐈","naam":"Kat","cat":"dieren"},{"id":"kip","emoji":"🐔","naam":"Kip","cat":"dieren"},{"id":"schaap","emoji":"🐑","naam":"Schaap","cat":"dieren"},{"id":"baby","emoji":"👶","naam":"Huilende baby","cat":"mensen"},{"id":"niezen","emoji":"🤧","naam":"Niezen","cat":"mensen"},{"id":"hijgen","emoji":"😮‍💨","naam":"Zwaar ademen","cat":"mensen"},{"id":"hoesten","emoji":"😷","naam":"Hoesten","cat":"mensen"},{"id":"lachen","emoji":"😂","naam":"Lachen","cat":"mensen"},{"id":"slurpen","emoji":"🥤","naam":"Slurpen","cat":"mensen"},{"id":"leeuw","emoji":"🦁","naam":"Leeuw","cat":"dieren"},{"id":"olifant","emoji":"🐘","naam":"Olifant","cat":"dieren"},{"id":"aap","emoji":"🐒","naam":"Aap","cat":"dieren"},{"id":"ezel","emoji":"🫏","naam":"Ezel","cat":"dieren"},{"id":"eend","emoji":"🦆","naam":"Eend","cat":"dieren"},{"id":"duif","emoji":"🕊️","naam":"Duif","cat":"dieren"},{"id":"uil","emoji":"🦉","naam":"Uil","cat":"dieren"},{"id":"aaaah","emoji":"😱","naam":"Aaaah!","cat":"mensen"},{"id":"scheten","emoji":"💨","naam":"Scheten","cat":"mensen"},{"id":"keelzang","emoji":"🧘","naam":"Keelzang","cat":"performance"},{"id":"jodel","emoji":"🏔️","naam":"Jodelen","cat":"performance"},{"id":"beatbox","emoji":"🎙️","naam":"Beatbox","cat":"performance"}];

const ACTIEVE_GELUIDEN = [...DIEREN];
const BUNDEL_GELUIDEN = [
  {id:"chewbacca", emoji:"🌌", naam:"Chewbacca", cat:"films", audioPath:"audio/basis/chewbacca.mp3", difficulty:4, legendary:true, modifierAllowed:true},
  {id:"homer_doh", emoji:"🍩", naam:"Homer — D’oh!", cat:"films", audioPath:"audio/basis/homer_doh.mp3", difficulty:1, legendary:true, modifierAllowed:true},
  {id:"darth_vader", emoji:"🌑", naam:"Darth Vader", cat:"films", audioPath:"audio/basis/darth_vader.mp3", difficulty:2, legendary:true, modifierAllowed:true},
  {id:"ballerina_capuchina_mrjda44b", emoji:"💃", naam:"Ballerina Cappuccina", cat:"performance", difficulty:3, fun:8, trimStart:0, trimEnd:2.8, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/ballerina_capuchina_mrjda44b.mp3"},
  {id:"bunghole_mrjdrblm", emoji:"📺", naam:"Bunghole", cat:"films", difficulty:3, fun:8, trimStart:0, trimEnd:6, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/bunghole_mrjdrblm.mp3"},
  {id:"dit_is_een_snackbar_mrmmhjv2", emoji:"🍟", naam:"Dit is een snackbar", cat:"films", difficulty:3, fun:8, trimStart:0, trimEnd:4.2, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/dit_is_een_snackbar_mrmmhjv2.mp3"},
  {id:"donkey_waffles_mrml96dg", emoji:"🫏", naam:"Donkey — Waffles!", cat:"films", difficulty:3, fun:8, trimStart:0, trimEnd:2.6, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/donkey_waffles_mrml96dg.mp3"},
  {id:"he_meisje_mrmmfg3b", emoji:"🎬", naam:"Hé meisje", cat:"films", difficulty:3, fun:8, trimStart:0, trimEnd:5, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/he_meisje_mrmmfg3b.mp3"},
  {id:"hehe_mrjdvz8j", emoji:"😏", naam:"Hehe", cat:"mensen", difficulty:3, fun:8, trimStart:0, trimEnd:1.4, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/hehe_mrjdvz8j.mp3"},
  {id:"its_me_mario_mrml7lyj", emoji:"🍄", naam:"It's me, Mario!", cat:"games", difficulty:3, fun:8, trimStart:0, trimEnd:2, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/its_me_mario_mrml7lyj.mp3"},
  {id:"maaskantje_mrmmg7f4", emoji:"🏘️", naam:"Maaskantje", cat:"films", difficulty:3, fun:8, trimStart:0, trimEnd:3.6, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/maaskantje_mrmmg7f4.mp3"},
  {id:"messi_messi_mrjeb15n", emoji:"⚽", naam:"Messi, Messi", cat:"performance", difficulty:3, fun:8, trimStart:1, trimEnd:8, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/messi_messi_mrjeb15n.mp3"},
  {id:"minions_papoy_mrjdzf3n", emoji:"💛", naam:"Minions — Papoy", cat:"films", difficulty:5, fun:8, trimStart:0, trimEnd:5.8, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/minions_papoy_mrjdzf3n.mp3"},
  {id:"omg_mrjde62r", emoji:"😲", naam:"OMG!", cat:"mensen", difficulty:3, fun:8, trimStart:0, trimEnd:4.8, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/omg_mrjde62r.mp3"},
  {id:"paard_mrje6sdm", emoji:"🐴", naam:"Paard", cat:"dieren", difficulty:3, fun:8, trimStart:0, trimEnd:1.3, legendary:false, modifierAllowed:true, audioPath:"audio/eigen/paard_mrje6sdm.mp3"},
  {id:"pee_ka_pee_pikachu_mrml4u4s", emoji:"⚡", naam:"Pikachu", cat:"games", difficulty:3, fun:8, trimStart:0, trimEnd:2.4, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/pee_ka_pee_pikachu_mrml4u4s.mp3"},
  {id:"scooby_mrml3gru", emoji:"🐶", naam:"Scooby-Doo", cat:"films", difficulty:3, fun:8, trimStart:0, trimEnd:2.8, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/scooby_mrml3gru.mp3"},
  {id:"shy_shy_shy_sana_twice_mrje5mey", emoji:"🎶", naam:"Shy Shy Shy", cat:"performance", difficulty:3, fun:8, trimStart:0, trimEnd:3, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/shy_shy_shy_sana_twice_mrje5mey.mp3"},
  {id:"stitch_mrjdnbez", emoji:"👽", naam:"Stitch", cat:"films", difficulty:3, fun:8, trimStart:1.8, trimEnd:6.5, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/stitch_mrjdnbez.mp3"},
  {id:"toad_wuh_wuh_mrml889y", emoji:"🍄", naam:"Toad", cat:"games", difficulty:3, fun:8, trimStart:0, trimEnd:2.3, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/toad_wuh_wuh_mrml889y.mp3"},
  {id:"trump_mrjdg6fm", emoji:"🗣️", naam:"Donald Trump", cat:"mensen", difficulty:3, fun:8, trimStart:0, trimEnd:4.2, legendary:false, modifierAllowed:false, audioPath:"audio/eigen/trump_mrjdg6fm.mp3"},
  {id:"villager_minecraft_mrml6w4v", emoji:"🟩", naam:"Minecraft Villager", cat:"games", difficulty:3, fun:8, trimStart:0, trimEnd:6.8, legendary:false, modifierAllowed:true, audioPath:"audio/eigen/villager_minecraft_mrml6w4v.mp3"}
];
ACTIEVE_GELUIDEN.push(...BUNDEL_GELUIDEN);

const BB_DB = "beestenboel-content-v1";
function openContentDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(BB_DB,1);
    req.onupgradeneeded=()=>{ const db=req.result; if(!db.objectStoreNames.contains("sounds")) db.createObjectStore("sounds",{keyPath:"id"}); };
    req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
  });
}
async function laadEigenGeluiden(){
  try{
    const db=await openContentDB();
    const rows=await new Promise((resolve,reject)=>{ const r=db.transaction("sounds","readonly").objectStore("sounds").getAll(); r.onsuccess=()=>resolve(r.result||[]); r.onerror=()=>reject(r.error); });
    for(const row of rows){ if(!ACTIEVE_GELUIDEN.some(x=>x.id===row.id)) ACTIEVE_GELUIDEN.push({...row, custom:true}); }
  }catch(e){ console.warn("Eigen geluiden konden niet worden geladen",e); }
}
async function customAudioBlob(id){
  const db=await openContentDB();
  return new Promise((resolve,reject)=>{ const r=db.transaction("sounds","readonly").objectStore("sounds").get(id); r.onsuccess=()=>resolve(r.result&&r.result.audioBlob); r.onerror=()=>reject(r.error); });
}

const MODIFIERS = [
  {id:"verliefd",emoji:"❤️",tekst:"…maar dan verliefd",profiel:"melodie"},
  {id:"hik",emoji:"😮",tekst:"…met een flinke hik",profiel:"stoten"},
  {id:"kiespijn",emoji:"🦷",tekst:"…met verschrikkelijke kiespijn",profiel:"dynamiek"},
  {id:"opera",emoji:"🎭",tekst:"…alsof je in een opera staat",profiel:"melodie"},
  {id:"bang",emoji:"😱",tekst:"…terwijl je doodsbang bent",profiel:"dynamiek"},
  {id:"woedend",emoji:"💢",tekst:"…maar dan woedend",profiel:"energie"},
  {id:"slaperig",emoji:"😴",tekst:"…half in slaap",profiel:"traag"},
  {id:"robot",emoji:"🤖",tekst:"…als een haperende robot",profiel:"stoten"},
  {id:"fluister",emoji:"🤫",tekst:"…maar je mag alleen fluisteren",profiel:"zacht"},
  {id:"rockster",emoji:"🎸",tekst:"…alsof je een rockster bent",profiel:"energie"},
  {id:"lachend",emoji:"😂",tekst:"…terwijl je niet kunt stoppen met lachen",profiel:"variatie"},
  {id:"dronken",emoji:"🥴",tekst:"…alsof je flink duizelig bent",profiel:"variatie"}
];
const MODIFIER_KANS = .42; // kans per beurt op een chaos-opdracht

const CATS = {
  dieren: {label:"Dieren", emoji:"🐾", kleur:"#43d17b", accent:"#b8ffcf", scene:"jungle"},
  mensen: {label:"Mens & stem", emoji:"🗣️", kleur:"#ff6b6b", accent:"#ffd0c8", scene:"podium"},
  performance: {label:"Muziek & performance", emoji:"🎤", kleur:"#a96cff", accent:"#e4c9ff", scene:"concert"},
  films: {label:"Films & tv", emoji:"🎬", kleur:"#ff4d8d", accent:"#ffc1d8", scene:"cinema"},
  games: {label:"Games", emoji:"🎮", kleur:"#37b9ff", accent:"#b7eaff", scene:"arcade"},
};

const FEEDBACK = [
  [0,  "De boer belt de dierenambulance… voor jou. 😅"],
  [20, "Het origineel herkent zichzelf er nét niet in."],
  [40, "Hmm. Van een afstandje, in de mist, misschien."],
  [55, "Niet gek! Het publiek begint te reageren."],
  [70, "Sterk! De zaal draait zich om."],
  [85, "WAUW. Het origineel is jaloers op jou. 🌟"],
  [95, "Ben jij het zélf?! Perfecte imitatie! 👑"],
];

/* ================= SPEL-STATE ================= */
const S = {
  spelers: [], rondes: 3, ronde: 0, beurt: 0,
  dier: null, cat: null, modifier: null,
  micOk: null,
  radHoek: 0,
  laatsteOpname: null,  // blob-URL (reserve)
  laatsteBuffer: null,  // gedecodeerde opname voor terugluisteren
  gebruikteOpdrachten: new Set(),
  gebruikteBasis: new Set(),
  showStats: null,
};

const $ = id => document.getElementById(id);
const schermen = ["scherm-setup","scherm-beurt","scherm-resultaat","scherm-einde"];
function toon(id){
  schermen.forEach(s => $(s).classList.toggle("verborgen", s!==id));
  const actief=$(id);
  if(actief){
    actief.style.animation="none";
    void actief.offsetWidth;
    actief.style.animation="";
  }
}
const wacht = ms => new Promise(r=>setTimeout(r,ms));

/* ================= AUDIODESIGN / SHOWDIRECTOR ================= */
const AudioDirector = {
  muted: localStorage.getItem("beestenboel-muted") === "1",
  master: null,
  ensure(){
    const ctx=audio();
    if(!this.master){
      this.master=ctx.createGain();
      this.master.gain.value=this.muted?0:.72;
      this.master.connect(ctx.destination);
    }
    return ctx;
  },
  setMuted(v){
    this.muted=!!v;
    localStorage.setItem("beestenboel-muted",this.muted?"1":"0");
    if(this.master) this.master.gain.setTargetAtTime(this.muted?0:.72,audio().currentTime,.02);
    const b=$("audio-toggle");
    if(b){ b.textContent=this.muted?"🔇":"🔊"; b.title=this.muted?"Showgeluid uit":"Showgeluid aan"; b.setAttribute("aria-label",this.muted?"Geluid aanzetten":"Geluid uitzetten"); }
  },
  tone(freq,dur=.12,{type="sine",gain=.12,delay=0,slide=null}={}){
    if(this.muted) return;
    const ctx=this.ensure(), t=ctx.currentTime+delay;
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.type=type; o.frequency.setValueAtTime(freq,t);
    if(slide) o.frequency.exponentialRampToValueAtTime(Math.max(25,slide),t+dur);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(gain,t+.012); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t+dur+.03);
  },
  noise(dur=.16,{gain=.06,delay=0,highpass=500}={}){
    if(this.muted) return;
    const ctx=this.ensure(), t=ctx.currentTime+delay;
    const n=Math.max(1,Math.floor(ctx.sampleRate*dur));
    const b=ctx.createBuffer(1,n,ctx.sampleRate), d=b.getChannelData(0);
    for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
    const src=ctx.createBufferSource(), f=ctx.createBiquadFilter(), g=ctx.createGain();
    src.buffer=b; f.type="highpass"; f.frequency.value=highpass; g.gain.value=gain;
    src.connect(f); f.connect(g); g.connect(this.master); src.start(t);
  },
  intro(){
    [392,523.25,659.25,783.99].forEach((f,i)=>this.tone(f,.28,{type:"triangle",gain:.10,delay:i*.10}));
    this.tone(196,.62,{type:"sawtooth",gain:.055,delay:.02,slide:392});
    this.noise(.45,{gain:.035,delay:.30,highpass:1800});
  },
  whoosh(){ this.noise(.28,{gain:.06,highpass:700}); this.tone(180,.25,{type:"sine",gain:.045,slide:520}); },
  category(cat){
    const sets={
      dieren:[196,261.6,392], mensen:[220,277.2,329.6], performance:[261.6,392,523.3], films:[174.6,261.6,349.2], games:[329.6,493.9,659.3]
    };
    (sets[cat]||sets.mensen).forEach((f,i)=>this.tone(f,.23,{type:i===0?"sawtooth":"triangle",gain:.075,delay:i*.075}));
    this.noise(.18,{gain:.025,delay:.13,highpass:2200});
  },
  countdown(n){
    if(n==="GA!"){
      this.tone(784,.30,{type:"square",gain:.10}); this.tone(1175,.34,{type:"triangle",gain:.09,delay:.06}); this.noise(.22,{gain:.045,delay:.04,highpass:1700});
    }else this.tone(440,.13,{type:"square",gain:.075});
  },
  recordStart(){ this.tone(880,.11,{type:"sine",gain:.08}); this.tone(1320,.14,{type:"sine",gain:.06,delay:.09}); },
  analyse(){
    [110,123.5,130.8,146.8].forEach((f,i)=>this.tone(f,.42,{type:"sawtooth",gain:.025,delay:i*.22}));
  },
  scoreTick(v){
    if(v%5===0) this.tone(360+v*4,.035,{type:"square",gain:.022});
  },
  score(score){
    if(score>=90){ [523,659,784,1047].forEach((f,i)=>this.tone(f,.32,{type:"triangle",gain:.09,delay:i*.07})); this.noise(.34,{gain:.045,delay:.18,highpass:1900}); }
    else if(score>=75){ [392,523,659].forEach((f,i)=>this.tone(f,.28,{type:"triangle",gain:.075,delay:i*.08})); }
    else if(score>=50){ this.tone(392,.20,{type:"triangle",gain:.065}); this.tone(494,.23,{type:"triangle",gain:.06,delay:.10}); }
    else { this.tone(220,.22,{type:"sine",gain:.055,slide:155}); }
  },
  victory(){
    [261.6,329.6,392,523.3,659.3,784].forEach((f,i)=>this.tone(f,.36,{type:"triangle",gain:.08,delay:i*.09}));
    this.noise(.65,{gain:.055,delay:.38,highpass:1500});
  }
};
async function showMoment({kicker="",icon="🎙️",title="",sub="",duur=1300,type=""}={}){
  const ov=$("show-overlay");
  $("show-overlay-kicker").textContent=kicker;
  $("show-overlay-icon").textContent=icon;
  $("show-overlay-title").textContent=title;
  $("show-overlay-sub").textContent=sub;
  ov.className="show-overlay "+type;
  ov.setAttribute("aria-hidden","false");
  requestAnimationFrame(()=>ov.classList.add("zichtbaar"));
  await wacht(duur);
  ov.classList.remove("zichtbaar");
  await wacht(320);
  ov.setAttribute("aria-hidden","true");
}



const ShowIntelligence = {
  reset(){
    S.showStats={events:[],legendaryCount:0,chaosCount:0,bestScore:-1,bestPlayer:"",leader:"",leaderChanges:0,turns:0,player:{}};
    for(const sp of S.spelers) S.showStats.player[sp.naam]={best:0,turns:0,streak85:0,total:0};
  },
  ensure(){ if(!S.showStats)this.reset(); return S.showStats; },
  emit(type,data={}){ const st=this.ensure(); const ev={type,at:Date.now(),round:S.ronde,turn:S.beurt,...data}; st.events.push(ev); return ev; },
  ranking(){ return [...S.spelers].sort((a,b)=>b.score-a.score || a.naam.localeCompare(b.naam)); },
  gap(){ const r=this.ranking(); return r.length>1?Math.max(0,r[0].score-r[1].score):0; },
  beforeTurn(player){
    const st=this.ensure(), ranking=this.ranking(), current=ranking.findIndex(x=>x.naam===player)+1;
    const isLastRound=S.ronde===S.rondes-1;
    if(isLastRound){
      const leader=ranking[0]; const me=S.spelers.find(x=>x.naam===player); const need=leader&&me&&leader.naam!==player?Math.max(1,leader.score-me.score+1):0;
      this.emit("final_round",{player,need});
      if(need>0 && need<=99) setTimeout(()=>ProfessorDecibel.show(`${player}, dit is de finale. Je hebt ${need} punten nodig om ${leader.naam} voorbij te gaan.`,{state:"denkt",duur:6000,emotion:"thinking",voiceKey:"final_need"}),900);
      else setTimeout(()=>ProfessorDecibel.show(`${player}, de laatste ronde. Alles wat je nu doet telt dubbel in mijn geheugen.`,{state:"praat",duur:5600,emotion:"confident",voiceKey:"final_round"}),900);
    }else if(current>1 && this.gap()<=12 && ranking[0]){
      setTimeout(()=>ProfessorDecibel.show(`${player}, je zit vlak achter ${ranking[0].naam}. Dit kan de stand veranderen.`,{state:"praat",duur:5000,emotion:"curious",voiceKey:"close_chase"}),1000);
    }
  },
  afterScore(player,score,{modifier=false,modifierScore=null}={}){
    const st=this.ensure(); st.turns++; if(modifier)st.chaosCount++;
    if(score>=90)st.legendaryCount++;
    const ps=st.player[player]||(st.player[player]={best:0,turns:0,streak85:0,total:0});
    const previousBest=ps.best; ps.turns++; ps.total+=score; ps.best=Math.max(ps.best,score); ps.streak85=score>=85?ps.streak85+1:0;
    const events=[];
    if(score>previousBest && ps.turns>1)events.push(this.emit("personal_best",{player,score,previousBest}));
    if(score>st.bestScore){ st.bestScore=score;st.bestPlayer=player;events.push(this.emit("show_record",{player,score})); }
    if(score>=90)events.push(this.emit("legendary_score",{player,score}));
    if(ps.streak85>=3)events.push(this.emit("hot_streak",{player,count:ps.streak85}));
    if(modifier && modifierScore>=78)events.push(this.emit("chaos_success",{player,score,modifierScore}));
    const ranking=this.ranking(), leader=ranking[0]?.naam||"";
    if(leader && st.leader && leader!==st.leader){ st.leaderChanges++;events.push(this.emit("leader_changed",{player:leader,previous:st.leader,gap:this.gap()})); }
    st.leader=leader;
    return events;
  },
  react(events){
    const priority=["leader_changed","show_record","personal_best","hot_streak","chaos_success","legendary_score"];
    const ev=priority.map(t=>events.find(e=>e.type===t)).find(Boolean); if(!ev)return;
    const lines={
      leader_changed:`${ev.player} neemt de leiding! De wedstrijd kantelt.`,
      show_record:`${ev.player}, dat is de hoogste score van de hele show: ${ev.score}!`,
      personal_best:`Nieuw persoonlijk record voor ${ev.player}: ${ev.score} punten.`,
      hot_streak:`${ev.player} is niet te stoppen: ${ev.count} sterke beurten op rij.`,
      chaos_success:`De chaosopdracht is overtuigend uitgevoerd. Mijn meters zijn onder de indruk.`,
      legendary_score:`Een legendarische score. Die noteren we met gouden inkt.`
    };
    setTimeout(()=>ProfessorDecibel.show(lines[ev.type],{state:["leader_changed","show_record","legendary_score"].includes(ev.type)?"juicht":"praat",duur:5400,emotion:"happy",voiceKey:ev.type}),2100);
  },
  async showStandings(duur=2600){
    const box=$("live-standings"), list=$("standing-list"); if(!box||!list)return;
    const medals=["🥇","🥈","🥉"]; list.innerHTML="";
    this.ranking().forEach((sp,i)=>{ const row=document.createElement("div"); row.className="standing-row"+(i===0?" leider":"");row.style.setProperty("--delay",`${i*80}ms`);
      for(const [cls,txt] of [["rank",medals[i]||i+1+"."],["name",sp.naam],["total",String(sp.score)]]){ const s=document.createElement("span"); s.className=cls; s.textContent=txt; row.appendChild(s); }
      list.appendChild(row); });
    box.setAttribute("aria-hidden","false");requestAnimationFrame(()=>box.classList.add("zichtbaar"));await wacht(duur);box.classList.remove("zichtbaar");await wacht(420);box.setAttribute("aria-hidden","true");
  },
  summary(){
    const st=this.ensure(), ranking=this.ranking(), gap=ranking.length>1?ranking[0].score-ranking[1].score:0;
    return {winner:ranking[0]?.naam||"",score:ranking[0]?.score||0,gap,bestPlayer:st.bestPlayer,bestScore:st.bestScore,legendary:st.legendaryCount,chaos:st.chaosCount,leaderChanges:st.leaderChanges,turns:st.turns};
  }
};

const ProfessorDecibel = {
  timer:null,
  blinkTimer:null,
  recent:[],
  currentCue:null,
  dialogs:{
    intro:[
      {id:"intro_01",text:"Welkom in mijn geluidslaboratorium. Oren open, stembanden los.",emotion:"warm",duration:5600},
      {id:"intro_02",text:"Goedenavond. Vanavond meten we lef, ritme en een gezonde dosis waanzin.",emotion:"warm",duration:5700},
      {id:"intro_03",text:"Professor Decibel presenteert. Maak geluid — ik doe de rest.",emotion:"confident",duration:5200}
    ],
    turn:[
      {id:"turn_01",text:"{player}, de microfoon is van jou.",emotion:"warm",duration:4300},
      {id:"turn_02",text:"{player}, laat eens horen wat je in huis hebt.",emotion:"curious",duration:4500},
      {id:"turn_03",text:"Daar is {player}. Geen zenuwen — wetenschap kan tegen een stootje.",emotion:"playful",duration:5000},
      {id:"turn_04",text:"{player}, adem in… en overtuig mijn meetapparatuur.",emotion:"confident",duration:4800}
    ],
    category_dieren:[
      {id:"cat_animals_01",text:"Welkom in het dierenrijk. Hier telt overtuiging.",emotion:"curious",duration:4500},
      {id:"cat_animals_02",text:"Klauwen uit, longen open. Dit is Dieren.",emotion:"playful",duration:4300},
      {id:"cat_animals_03",text:"Een goede dierenimitatie begint diep in de buik.",emotion:"wise",duration:4700}
    ],
    category_mensen:[
      {id:"cat_voice_01",text:"Mens en stem. Timing, karakter en lef.",emotion:"wise",duration:4400},
      {id:"cat_voice_02",text:"Maak er geen geluid van — maak er een personage van.",emotion:"confident",duration:4800},
      {id:"cat_voice_03",text:"De menselijke stem is mijn favoriete meetinstrument.",emotion:"warm",duration:4700}
    ],
    category_performance:[
      {id:"cat_perf_01",text:"Ritme aan. Schaamte uit. Het podium is van jou.",emotion:"excited",duration:4700},
      {id:"cat_perf_02",text:"Muziek en performance. Ik verwacht flair — veel flair.",emotion:"excited",duration:4800},
      {id:"cat_perf_03",text:"Laat je horen. De zaal luistert mee.",emotion:"warm",duration:4200}
    ],
    category_films:[
      {id:"cat_film_01",text:"Camera loopt. Geluid loopt. Actie!",emotion:"excited",duration:4100},
      {id:"cat_film_02",text:"Films en tv. Maak het groot, maak het herkenbaar.",emotion:"confident",duration:4700},
      {id:"cat_film_03",text:"Een icoon imiteren vraagt filmwaardige stembanden.",emotion:"wise",duration:4900}
    ],
    category_games:[
      {id:"cat_games_01",text:"Player one: maak geluid.",emotion:"playful",duration:3900},
      {id:"cat_games_02",text:"Game on. Geen respawn nodig — gewoon vol erin.",emotion:"excited",duration:4600},
      {id:"cat_games_03",text:"Combo klaar. Microfoon actief.",emotion:"confident",duration:4000}
    ],
    difficult:[
      {id:"hard_01",text:"Oei… deze is pittig. Goed luisteren.",emotion:"curious",duration:4300},
      {id:"hard_02",text:"Hier liggen veel punten. Maar ze komen niet vanzelf.",emotion:"wise",duration:4700},
      {id:"hard_03",text:"Een uitdaging van formaat. Neem je tijd.",emotion:"confident",duration:4500}
    ],
    chaos:[
      {id:"chaos_01",text:"Aha. Een wetenschappelijk onverantwoorde variant.",emotion:"excited",duration:4700},
      {id:"chaos_02",text:"Nu wordt het interessant. Voer álles uit wat er staat.",emotion:"playful",duration:4800},
      {id:"chaos_03",text:"Dit kan werkelijk alle kanten op. Prachtig.",emotion:"excited",duration:4400},
      {id:"chaos_04",text:"Basisgeluid én chaosopdracht. Ik meet ze allebei.",emotion:"wise",duration:4700}
    ],
    analysis:[
      {id:"analysis_01",text:"Stilte. Ik meet toon, ritme en timing.",emotion:"thinking",duration:4600},
      {id:"analysis_02",text:"Een moment… mijn algoritmes zijn het nog niet eens.",emotion:"thinking",duration:5000},
      {id:"analysis_03",text:"Ik hoor iets interessants. Nog heel even.",emotion:"thinking",duration:4500},
      {id:"analysis_04",text:"Niets ontsnapt aan mijn oren. Bijna klaar.",emotion:"thinking",duration:4500}
    ],
    score_silent:[
      {id:"silent_01",text:"Ik hoorde de stilte uitstekend. De imitatie iets minder.",emotion:"dry",duration:5000},
      {id:"silent_02",text:"Mijn apparatuur registreert vooral… rust.",emotion:"dry",duration:4700}
    ],
    score_low:[
      {id:"score_low_01",text:"{player}, wetenschappelijk gezien was dit vooral moedig.",emotion:"dry",duration:5000},
      {id:"score_low_02",text:"Creatief. Zeer creatief. Het origineel houdt voorlopig afstand.",emotion:"playful",duration:5200},
      {id:"score_low_03",text:"Mijn meetapparatuur is nog aan het bijkomen.",emotion:"dry",duration:4700}
    ],
    score_mid:[
      {id:"score_mid_01",text:"Daar zat beslist iets in, {player}.",emotion:"warm",duration:4400},
      {id:"score_mid_02",text:"Een solide bijdrage aan de geluidswetenschap.",emotion:"wise",duration:4700},
      {id:"score_mid_03",text:"Ik hoorde potentie. En behoorlijk wat volume.",emotion:"playful",duration:4700}
    ],
    score_high:[
      {id:"score_high_01",text:"Uitstekend, {player}. Mijn snor trilt ervan.",emotion:"happy",duration:5000},
      {id:"score_high_02",text:"Dat was laboratoriumwaardig. Zeer overtuigend.",emotion:"happy",duration:4800},
      {id:"score_high_03",text:"Heel sterk. Het origineel begint nerveus te worden.",emotion:"playful",duration:4900}
    ],
    score_top:[
      {id:"score_top_01",text:"Professor Decibel is sprakeloos. Dit gaat het archief in!",emotion:"celebrate",duration:5600},
      {id:"score_top_02",text:"Een historisch geluidsmoment, {player}!",emotion:"celebrate",duration:5200},
      {id:"score_top_03",text:"Fenomenaal. Daar kan ik alleen maar voor applaudisseren.",emotion:"celebrate",duration:5500}
    ],
    modifier_energy:[
      {id:"mod_energy_01",text:"Ik hoorde energie. Heel veel energie.",emotion:"happy",duration:4300},
      {id:"mod_energy_02",text:"Die extra speelstijl kwam duidelijk binnen.",emotion:"happy",duration:4400}
    ],
    modifier_soft:[
      {id:"mod_soft_01",text:"Subtiel uitgevoerd. Mijn gevoelige meters waardeerden dat.",emotion:"wise",duration:4700}
    ],
    modifier_rhythm:[
      {id:"mod_rhythm_01",text:"De onderbrekingen zaten er overtuigend in.",emotion:"happy",duration:4500}
    ],
    modifier_melody:[
      {id:"mod_melody_01",text:"Er zat zowaar melodie in. Dat hoor ik graag.",emotion:"happy",duration:4500}
    ]
  },
  interpolate(text,ctx={}){
    return text.replace(/\{(\w+)\}/g,(_,k)=>ctx[k] ?? "");
  },
  select(group,ctx={}){
    const pool=this.dialogs[group]||this.dialogs.intro;
    let candidates=pool.filter(x=>!this.recent.includes(x.id));
    if(!candidates.length)candidates=pool;
    const cue={...candidates[Math.floor(Math.random()*candidates.length)]};
    cue.text=this.interpolate(cue.text,ctx);
    cue.voiceKey=cue.voiceKey||cue.id;
    this.recent.push(cue.id);
    if(this.recent.length>8)this.recent.shift();
    return cue;
  },
  stateForEmotion(emotion){
    if(["thinking"].includes(emotion))return "denkt";
    if(["happy","celebrate","excited"].includes(emotion))return "juicht";
    return "praat";
  },
  speak(group,ctx={},overrides={}){
    const cue=this.select(group,ctx);
    this.currentCue=cue;
    this.show(cue.text,{state:this.stateForEmotion(cue.emotion),duur:cue.duration,...overrides,voiceKey:cue.voiceKey,emotion:cue.emotion});
    return cue;
  },
  show(text,{state="praat",duur=5200,links=false,voiceKey=null,emotion="neutral"}={}){
    const el=$("professor-decibel"); if(!el)return;
    clearTimeout(this.timer);
    el.className="professor-decibel zichtbaar "+state+(links?" links":"");
    el.dataset.emotion=emotion;
    if(voiceKey)el.dataset.voiceKey=voiceKey; else delete el.dataset.voiceKey;
    $("pd-text").textContent=text; el.setAttribute("aria-hidden","false");
    this.startBlinking();
    this.timer=setTimeout(()=>this.hide(),Math.max(duur,4200));
  },
  hide(){
    const el=$("professor-decibel");if(!el)return;
    el.classList.add("afscheid");
    clearTimeout(this.blinkTimer);
    setTimeout(()=>{el.className="professor-decibel";el.setAttribute("aria-hidden","true")},410);
  },
  startBlinking(){
    clearTimeout(this.blinkTimer);
    const blink=()=>{
      const avatar=$("pd-avatar");
      const host=$("professor-decibel");
      if(!avatar||!host||!host.classList.contains("zichtbaar"))return;
      avatar.classList.add("blink");
      setTimeout(()=>avatar.classList.remove("blink"),210);
      this.blinkTimer=setTimeout(blink,2200+Math.random()*3600);
    };
    this.blinkTimer=setTimeout(blink,900+Math.random()*1800);
  },
  intro(){return this.speak("intro")},
  turn(player){return this.speak("turn",{player})},
  category(cat,difficulty=1){
    const cue=this.speak("category_"+cat);
    if(difficulty>=4)setTimeout(()=>this.speak("difficult",{}, {duur:4400}),Math.min(2500,cue.duration-1200));
    return cue;
  },
  chaos(){return this.speak("chaos")},
  analyse(){return this.speak("analysis",{}, {state:"denkt"})},
  score(score,stil=false,{player="",modifier=null,modifierScore=null}={}){
    if(stil)return this.speak("score_silent",{player},{state:"denkt"});
    const group=score>=90?"score_top":score>=75?"score_high":score>=50?"score_mid":"score_low";
    const cue=this.speak(group,{player},{state:score>=75?"juicht":"praat"});
    if(modifier && modifierScore>=72 && score<90){
      const map={energie:"modifier_energy",zacht:"modifier_soft",stoten:"modifier_rhythm",melodie:"modifier_melody"};
      const follow=map[modifier.profiel];
      if(follow)setTimeout(()=>this.speak(follow,{player}),Math.min(2800,cue.duration-900));
    }
    return cue;
  }
};

function applyCategoryTheme(cat){
  document.body.classList.remove("cat-dieren","cat-mensen","cat-performance","cat-films","cat-games");
  if(cat && CATS[cat]) document.body.classList.add("cat-"+cat);
  document.body.dataset.scene = cat && CATS[cat] ? CATS[cat].scene : "studio";
}

async function showIntro(){
  applyCategoryTheme(null);
  AudioDirector.intro();
  await showMoment({kicker:"Family sound show",icon:"🐐",title:"BEESTENBOEL!",sub:"Hoor · doe na · scoor",duur:1650});
  await showMoment({kicker:"Vanavond in de studio",icon:"🎙️",title:"MAAK GELUID",sub:"De computer luistert. De rest kijkt toe.",duur:1250});
  ProfessorDecibel.intro();
}


/* ================= AUDIO-BASIS ================= */
let actx = null;
function audio(){ if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==="suspended") actx.resume(); return actx; }


/* ===== ANALYSE: frames → kenmerken → DTW-vergelijking =====
   Afgesteld op een testbank: perfecte imitatie ≈ 99, imitatie in
   ander tempo/register ≈ 80, verkeerd geluid ≤ ~53.               */
function analyseFrame(buf, sr){
  let rms = 0;
  for(let i=0;i<buf.length;i++) rms += buf[i]*buf[i];
  rms = Math.sqrt(rms/buf.length);
  let f0 = null, klr = 0;
  if(rms > 1e-4){
    const maxLag = Math.floor(sr/70), minLag = Math.floor(sr/900);
    let bestLag = -1, best = 0, e0 = 0;
    for(let i=0;i<buf.length;i++) e0 += buf[i]*buf[i];
    for(let lag=minLag; lag<=maxLag; lag++){
      let som = 0;
      for(let i=0;i<buf.length-lag;i++) som += buf[i]*buf[i+lag];
      if(som > best){ best = som; bestLag = lag; }
    }
    if(e0 > 0 && bestLag > 0){
      klr = best/e0;
      if(klr >= .35) f0 = sr/bestLag;
    }
  }
  return {f0, rms, klr};
}
function maakFrames(kanaal, sr){
  const hop = Math.floor(sr*.05), win = 2048;
  const uit = [];
  for(let i=0; i+win < kanaal.length; i+=hop)
    uit.push(analyseFrame(kanaal.subarray(i,i+win), sr));
  return uit;
}
function kenmerken(fr){
  let mx = 1e-9;
  for(const f of fr) mx = Math.max(mx, f.rms);
  let vn = fr.map(f=>f.rms/mx);
  let a=0, b=vn.length-1;
  while(a<b && vn[a]<.12) a++;
  while(b>a && vn[b]<.12) b--;
  fr = fr.slice(a,b+1); vn = vn.slice(a,b+1);
  let p = fr.map((f,i)=> (f.f0 && vn[i]>.12) ? Math.log2(f.f0) : null);
  const pm = p.slice();
  for(let i=1;i<p.length-1;i++){
    if(p[i]!=null && p[i-1]!=null && p[i+1]!=null){
      const trio = [p[i-1],p[i],p[i+1]].sort((x,y)=>x-y);
      pm[i] = trio[1];                       // mediaan tegen octaafspikes
    }
  }
  let events=0, laatst=-10;
  for(let i=0;i<vn.length;i++){
    if(vn[i]>.4 && (i===0 || vn[i-1]<=.4) && i-laatst>=3){ events++; laatst=i; }
  }
  const ges = pm.filter(x=>x!=null);
  const gem = ges.length ? ges.reduce((s,x)=>s+x,0)/ges.length : 0;
  const pc = pm.map(x=> x!=null ? x-gem : null);   // toonsoort-onafhankelijk
  let actief=0;
  for(const v of vn) if(v>.25) actief++;
  const cov = Math.min(1, ges.length/Math.max(1,actief));
  return {p:pc, v:vn, events, duur:vn.length*.05, cov, maxRms:mx};
}
function octdiff(d){ return Math.min(Math.abs(d), Math.abs(d-1), Math.abs(d+1)); }
function vergelijk(A, B){
  const nA = A.v.length, nB = B.v.length;
  if(nB < 5 || nA < 2) return null;
  const INF = 1e9;
  const D = Array.from({length:nA+1}, ()=> new Float64Array(nB+1).fill(INF));
  D[0][0] = 0;
  for(let i=1;i<=nA;i++){
    for(let j=1;j<=nB;j++){
      if(Math.abs(i/nA - j/nB) > .3) continue;
      const pa = A.p[i-1], pb = B.p[j-1];
      const dv = Math.abs(A.v[i-1]-B.v[j-1]);
      let kost;
      if(pa!=null && pb!=null) kost = .55*Math.min(1, octdiff(pa-pb)/.5) + .45*dv;
      else if((pa==null) !== (pb==null)) kost = .45*dv + .3;
      else kost = dv;
      D[i][j] = kost + Math.min(D[i-1][j-1], D[i-1][j]+.07, D[i][j-1]+.07);
    }
  }
  let i=nA, j=nB;
  if(D[i][j] >= INF) return null;
  const tA=[], tB=[];
  let tsom=0, tn=0, vsom=0, vn_=0, afw=0, padlen=0;
  while(i>0 && j>0){
    const pa = A.p[i-1], pb = B.p[j-1];
    if(pa!=null && pb!=null){ tsom += octdiff(pa-pb); tn++; tA.push(pa); tB.push(pb); }
    vsom += Math.abs(A.v[i-1]-B.v[j-1]); vn_++;
    afw += Math.abs(i/nA - j/nB); padlen++;
    const kandidaten = [[D[i-1][j-1],0],[D[i-1][j],1],[D[i][j-1],2]];
    kandidaten.sort((x,y)=>x[0]-y[0]);
    const stap = kandidaten[0][1];
    if(stap===0){ i--; j--; } else if(stap===1){ i--; } else { j--; }
  }
  const warp = Math.max(0, 1 - (afw/Math.max(1,padlen))/.14);
  let corr = 0;
  if(tn >= 8){
    const gemA = tA.reduce((s,x)=>s+x,0)/tn, gemB = tB.reduce((s,x)=>s+x,0)/tn;
    let sAB=0, sA=0, sB=0;
    for(let k=0;k<tn;k++){
      const da = tA[k]-gemA, db = tB[k]-gemB;
      sAB += da*db; sA += da*da; sB += db*db;
    }
    if(sA>1e-6 && sB>1e-6) corr = sAB/Math.sqrt(sA*sB);
  }
  const toon_d = tn ? Math.max(0, 1 - (tsom/tn)/.38) : null;
  const ritme  = Math.max(0, 1 - (vsom/Math.max(1,vn_))/.32);
  const dek = tn ? Math.min(1, (tn/Math.max(1,vn_))/.4) : 0;
  return {toon_d, corr, ritme, dek, warp};
}
function berekenScore(refK, opK){
  if(!opK || opK.v.length < 6 || opK.maxRms < .01) return {score:3, stil:true};
  const r = vergelijk(refK, opK);
  if(!r) return {score:3, stil:true};
  let toon = r.toon_d!=null ? (.55*r.toon_d + .45*Math.max(0,r.corr)) : .35;
  toon = toon*r.dek + .35*(1-r.dek);
  const ev = 1 - Math.abs(refK.events-opK.events)/Math.max(refK.events, opK.events, 1);
  const ratio = Math.min(opK.duur/refK.duur, refK.duur/opK.duur);
  const duur = Math.max(0, (ratio-.25)/.75);
  const wP = .2 + .45*refK.cov, wR = .62 - .34*refK.cov, wD = Math.max(.08, 1-wP-wR);
  // strengheidscurve per onderdeel, zodat de balkjes en de score één verhaal vertellen
  const vorm = x => Math.min(99, 106*Math.pow(Math.max(0,x), 1.15));
  const wf = .85 + .15*r.warp;
  const T = vorm(toon*wf);
  const R = vorm((.62*r.ritme + .38*ev)*wf);
  const Du = vorm(duur*wf);
  const score = Math.round(Math.min(99, Math.max(5, wP*T + wR*R + wD*Du)));
  const delen = {toon:Math.round(T), ritme:Math.round(R), tempo:Math.round(Du)};
  const gewichten = {toon:Math.round(100*wP), ritme:Math.round(100*wR), tempo:Math.round(100*wD)};
  return {score, stil:false, delen, gewichten};
}

async function laadDier(dier){
  if(dier.buffer) return dier;
  const ctx = audio();
  let ab;
  if(dier.audioPath){ ab = await fetch(dier.audioPath).then(r=>{if(!r.ok) throw new Error("Audio ontbreekt"); return r.arrayBuffer();}); }
  else if(dier.custom){ const blob=await customAudioBlob(dier.id); if(!blob) throw new Error("Eigen audio ontbreekt"); ab=await blob.arrayBuffer(); }
  else { ab = await fetch("audio/basis/"+dier.id+".mp3").then(r=>{if(!r.ok) throw new Error("Audio ontbreekt"); return r.arrayBuffer();}); }
  dier.buffer = await ctx.decodeAudioData(ab.slice(0));
  // Pas in de Geluidenstudio ingestelde trimpunten ook toe op vaste bundelgeluiden toe.
  if(Number.isFinite(dier.trimStart) || Number.isFinite(dier.trimEnd)){
    const startSec = Math.max(0, Number(dier.trimStart)||0);
    const endSec = Math.min(dier.buffer.duration, Number(dier.trimEnd)||dier.buffer.duration);
    if(endSec > startSec + .05){
      const sr=dier.buffer.sampleRate, begin=Math.floor(startSec*sr), einde=Math.floor(endSec*sr);
      const geknipt=ctx.createBuffer(dier.buffer.numberOfChannels, einde-begin, sr);
      for(let c=0;c<dier.buffer.numberOfChannels;c++) geknipt.copyToChannel(dier.buffer.getChannelData(c).slice(begin,einde),c);
      dier.buffer=geknipt;
    }
  }
  dier.analyse = kenmerken(maakFrames(dier.buffer.getChannelData(0), dier.buffer.sampleRate));
  return dier;
}

function speelDier(dier){
  const ctx = audio();
  const src = ctx.createBufferSource();
  src.buffer = dier.buffer;
  src.connect(ctx.destination);
  src.start();
  return dier.buffer.duration;
}

/* ================= GELUIDSEFFECTEN (ingebakken studio-clips) ================= */
const SFX_NAMEN = ["glinster","tromgeroffel","applaus","plof","trombone","tik"];
const sfxCache = {};
async function sfxBuffer(naam){
  if(sfxCache[naam]) return sfxCache[naam];
  const ctx = audio();
  const ab = await fetch("audio/sfx/"+naam+".mp3").then(r=>{if(!r.ok) throw new Error("SFX ontbreekt"); return r.arrayBuffer();});
  const buf = await new Promise((res,rej)=> ctx.decodeAudioData(ab, res, rej));
  sfxCache[naam] = buf;
  return buf;
}
function speelSfx(naam, vol){
  if(AudioDirector.muted) return;
  sfxBuffer(naam).then(buf=>{
    const ctx = audio();
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = vol==null ? 1 : vol;
    src.connect(g); AudioDirector.ensure(); g.connect(AudioDirector.master);
    src.start();
  }).catch(()=>{});
}
const SFX = {
  klik(){ speelSfx("tik", .55); },
  tromgeroffel(){ speelSfx("tromgeroffel", .8); },
  applaus(){ speelSfx("applaus", .95); },
  trombone(){ speelSfx("trombone", .9); },
  plof(){ speelSfx("plof", .85); },
  glinster(){ speelSfx("glinster", .8); },
};

/* ================= OPNAME ================= */
let micStream = null;

async function vraagMic(timeoutMs){
  if(S.micOk === false) return false;
  if(S.micOk === true && micStream) return true;
  try{
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){ S.micOk = false; return false; }
    const vraag = navigator.mediaDevices.getUserMedia({audio:true});
    const timeout = new Promise(r=>setTimeout(()=>r("timeout"), timeoutMs||3500));
    const res = await Promise.race([vraag, timeout]);
    if(res === "timeout"){
      vraag.then(s=>{ micStream = s; S.micOk = true; }).catch(()=>{ S.micOk = false; });
      return false;
    }
    micStream = res; S.micOk = true; return true;
  }catch(e){ S.micOk = false; return false; }
}

function neemOp(duurSec, onLevel){
  return new Promise(resolve=>{
    const ctx = audio();
    const bron = ctx.createMediaStreamSource(micStream);
    const an = ctx.createAnalyser();
    an.fftSize = 2048;
    bron.connect(an);
    const data = new Float32Array(an.fftSize);
    const liveFrames = [];  // reserve-analyse als de opname niet te decoderen is
    let rec = null, chunks = [];
    try{
      rec = new MediaRecorder(micStream);
      rec.ondataavailable = e=>{ if(e.data.size) chunks.push(e.data); };
      rec.start();
    }catch(e){ rec = null; }
    const iv = setInterval(()=>{
      an.getFloatTimeDomainData(data);
      const r = analyseFrame(data, ctx.sampleRate);
      liveFrames.push(r);
      onLevel(Math.min(1, r.rms*9));
    }, 50);
    setTimeout(()=>{
      clearInterval(iv);
      bron.disconnect();
      if(rec && rec.state !== "inactive"){
        rec.onstop = ()=> resolve({liveFrames, blob: new Blob(chunks, {type: rec.mimeType||"audio/webm"})});
        rec.stop();
      } else {
        resolve({liveFrames, blob:null});
      }
    }, duurSec*1000);
  });
}

/* analyseer bij voorkeur de échte opname (geen timer-jitter);
   de gedecodeerde buffer wordt bewaard voor het terugluisteren */
async function analyseerOpname(opname){
  if(opname.blob && opname.blob.size > 0){
    try{
      const ctx = audio();
      const ab = await opname.blob.arrayBuffer();
      const buf = await new Promise((res,rej)=> ctx.decodeAudioData(ab, res, rej));
      return {k: kenmerken(maakFrames(buf.getChannelData(0), buf.sampleRate)), buffer: buf};
    }catch(e){ /* val terug */ }
  }
  return {k: kenmerken(opname.liveFrames), buffer: null};
}

/* (de vergelijking gebeurt in de analyse-suite hierboven) */

/* ================= WAKE LOCK: scherm aan houden ================= */
let wakeLock = null;
async function houdSchermWakker(){
  try{
    if("wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen");
  }catch(e){ /* niet ondersteund of geweigerd: geen ramp */ }
}
document.addEventListener("visibilitychange", ()=>{
  if(document.visibilityState==="visible" && wakeLock !== null) houdSchermWakker();
});

/* ================= UI: SETUP ================= */
function tekenSpelers(){
  const el = $("speler-lijst");
  el.innerHTML = "";
  S.spelers.forEach((sp,i)=>{
    const d = document.createElement("div");
    d.className = "speler-item";
    const naamSpan = document.createElement("span");
    naamSpan.textContent = `${["🐮","🐱","🐶","🐔","🐑","🦉","🐸","🐷"][i%8]} ${sp.naam}`;
    d.appendChild(naamSpan);
    const b = document.createElement("button");
    b.textContent = "✕";
    b.onclick = ()=>{ S.spelers.splice(i,1); tekenSpelers(); };
    d.appendChild(b);
    el.appendChild(d);
  });
  $("btn-start").disabled = S.spelers.length < 2;
}
function voegToe(){
  const inp = $("naam-input");
  const n = inp.value.trim();
  if(!n || S.spelers.length >= 8) return;
  S.spelers.push({naam:n, score:0});
  inp.value = ""; inp.focus();
  tekenSpelers();
}
$("btn-voeg-toe").onclick = voegToe;
$("naam-input").addEventListener("keydown", e=>{ if(e.key==="Enter") voegToe(); });
document.querySelectorAll(".ronde-knop").forEach(b=>{
  b.onclick = ()=>{
    S.rondes = +b.dataset.r;
    document.querySelectorAll(".ronde-knop").forEach(x=>x.classList.toggle("actief", x===b));
  };
});
document.querySelector('.ronde-knop[data-r="3"]').click();

$("btn-start").onclick = async ()=>{
  try{ audio(); }catch(e){}
  wisSpel();
  S.ronde = 0; S.beurt = 0;
  S.spelers.forEach(s=>s.score=0);
  S.gebruikteOpdrachten = new Set();
  S.gebruikteBasis = new Set();
  ShowIntelligence.reset();
  houdSchermWakker();
  SFX_NAMEN.forEach(n=>sfxBuffer(n).catch(()=>{})); // effecten alvast laden
  await showIntro();
  nieuweBeurt();
  vraagMic(3500);
};

/* ================= RAD: opbouw en fysica ================= */
const RAD = {cx:120, cy:150, r:110, pegs:24, segmenten:[]};
function polar(a, r){    // a in graden: 0 = boven, met de klok mee
  const rad = (a-90)*Math.PI/180;
  return [RAD.cx + r*Math.cos(rad), RAD.cy + r*Math.sin(rad)];
}
function bouwRad(){
  const cats = Object.keys(CATS).filter(c=>ACTIEVE_GELUIDEN.some(d=>d.cat===c));
  const tel = cats.map(c=>ACTIEVE_GELUIDEN.filter(d=>d.cat===c).length);
  const tot = tel.reduce((a,b)=>a+b,0);
  // vakken evenredig met inhoud, met een minimum zodat kleine vakken raakbaar blijven
  let hoeken = tel.map(n=>Math.max(24, n/tot*360));
  const som = hoeken.reduce((a,b)=>a+b,0);
  hoeken = hoeken.map(h=>h*360/som);
  RAD.segmenten = [];
  let a = 0, svg = "";
  cats.forEach((c,i)=>{
    const a1=a, a2=a+hoeken[i]; a = a2;
    RAD.segmenten.push({cat:c, a1, a2});
    const [x1,y1]=polar(a1,RAD.r), [x2,y2]=polar(a2,RAD.r);
    const groot = (a2-a1)>180 ? 1 : 0;
    svg += `<path class="wig" data-cat="${c}" d="M${RAD.cx} ${RAD.cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${RAD.r} ${RAD.r} 0 ${groot} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${CATS[c].kleur}" stroke="var(--inkt)" stroke-width="3" stroke-linejoin="round"/>`;
    const mid=(a1+a2)/2, maat = Math.min(30, 12+(a2-a1)*.22);
    const [tx,ty]=polar(mid, RAD.r*.62);
    svg += `<text class="rad-tekst" x="${tx.toFixed(1)}" y="${(ty+maat*.35).toFixed(1)}" text-anchor="middle" font-size="${maat.toFixed(0)}">${CATS[c].emoji}</text>`;
  });
  for(let i=0;i<RAD.pegs;i++){
    const [px,py]=polar(i*360/RAD.pegs, RAD.r-8);
    svg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="var(--room)" stroke="var(--inkt)" stroke-width="2"/>`;
  }
  svg += `<circle cx="${RAD.cx}" cy="${RAD.cy}" r="${RAD.r}" fill="none" stroke="var(--inkt)" stroke-width="5"/>`;
  svg += `<circle cx="${RAD.cx}" cy="${RAD.cy}" r="19" fill="var(--inkt)"/>`;
  svg += `<text x="${RAD.cx}" y="${RAD.cy+6}" text-anchor="middle" font-size="18">🐐</text>`;
  $("rad-groep").innerHTML = svg;
  $("rad-groep").setAttribute("transform", `rotate(${S.radHoek%360} ${RAD.cx} ${RAD.cy})`);
  $("rad-legenda").textContent = cats.map(c=>`${CATS[c].emoji} ${CATS[c].label}`).join(" · ");
}
function draaiNaar(doelHoek, duurMs){
  // het rad wordt frame-voor-frame gedraaid, zodat elke pin die het wijzertje
  // passeert een échte tik geeft — de tikjes vertragen dus vanzelf mee
  return new Promise(res=>{
    const start = S.radHoek, delta = doelHoek - start;
    const pegStap = 360/RAD.pegs;
    let laatstePeg = Math.floor(start/pegStap);
    const t0 = performance.now();
    function stap(nu){
      const x = Math.min(1, (nu-t0)/duurMs);
      const e = 1 - Math.pow(1-x, 3.4);
      S.radHoek = start + delta*e;
      $("rad-groep").setAttribute("transform", `rotate(${S.radHoek%360} ${RAD.cx} ${RAD.cy})`);
      const peg = Math.floor(S.radHoek/pegStap);
      if(peg !== laatstePeg){
        laatstePeg = peg;
        SFX.klik();
        $("flapper").classList.add("kick");
        setTimeout(()=>$("flapper").classList.remove("kick"), 60);
      }
      if(x < 1) requestAnimationFrame(stap); else res();
    }
    requestAnimationFrame(stap);
  });
}

/* ================= SPEL BEWAREN (overleeft een refresh) ================= */
const OPSLAG = "beestenboel-spel";
function bewaarSpel(){
  try{
    localStorage.setItem(OPSLAG, JSON.stringify({
      spelers:S.spelers, rondes:S.rondes, ronde:S.ronde, beurt:S.beurt,
      opdrachten:[...S.gebruikteOpdrachten], basisGebruikt:[...S.gebruikteBasis],
    }));
  }catch(e){ /* opslag niet beschikbaar: spel werkt gewoon door */ }
}
function wisSpel(){ try{ localStorage.removeItem(OPSLAG); }catch(e){} }
function laadSpel(){
  try{
    const d = JSON.parse(localStorage.getItem(OPSLAG));
    return (d && d.spelers && d.spelers.length >= 2) ? d : null;
  }catch(e){ return null; }
}

/* ================= UI: BEURT (rad + geluid) ================= */
function pakOpdracht(cat){
  const basis = ACTIEVE_GELUIDEN.filter(d=>d.cat===cat);
  // Stap 1: kies het dier — verse basisgeluiden eerst, zodat alles breed verdeeld wordt.
  let dieren = basis.filter(d=>!S.gebruikteBasis.has(d.id));
  if(!dieren.length){
    if(S.gebruikteBasis.size >= ACTIEVE_GELUIDEN.length) S.gebruikteBasis.clear();
    dieren = basis;
  }
  const dier = dieren[Math.floor(Math.random()*dieren.length)];
  // Stap 2: beslis met 42% kans of er een chaos-opdracht bij komt (het verrassingsmoment blijft schaars).
  const wilModifier = dier.modifierAllowed !== false && Math.random() < MODIFIER_KANS;
  const basisOptie = [{dier, modifier:null, sleutel:`${dier.id}|basis`}];
  const modOpties = dier.modifierAllowed !== false
    ? MODIFIERS.map(m=>({dier, modifier:m, sleutel:`${dier.id}|${m.id}`}))
    : [];
  // Stap 3: kies binnen die vorm een combinatie die dit potje nog niet voorbijkwam.
  const vers = lijst => lijst.filter(o=>!S.gebruikteOpdrachten.has(o.sleutel));
  let kandidaten = vers(wilModifier ? modOpties : basisOptie);
  if(!kandidaten.length) kandidaten = vers(wilModifier ? basisOptie : modOpties); // andere vorm proberen
  if(!kandidaten.length){
    // alles van dit dier al gehad: geef zijn combinaties weer vrij
    for(const o of basisOptie.concat(modOpties)) S.gebruikteOpdrachten.delete(o.sleutel);
    kandidaten = wilModifier && modOpties.length ? modOpties : basisOptie;
  }
  const keuze = kandidaten[Math.floor(Math.random()*kandidaten.length)];
  S.gebruikteOpdrachten.add(keuze.sleutel);
  S.gebruikteBasis.add(keuze.dier.id);
  return keuze;
}
function tekenChips(){
  const el = $("score-chips"); el.innerHTML = "";
  S.spelers.forEach((sp,i)=>{
    const c = document.createElement("div");
    c.className = "chip" + (i===S.beurt ? " actief":"");
    c.textContent = `${sp.naam} · ${sp.score}`;
    el.appendChild(c);
  });
}
async function nieuweBeurt(){
  bewaarSpel();
  const sp = S.spelers[S.beurt];
  toon("scherm-beurt");
  tekenChips();
  $("ronde-label").textContent = `Ronde ${S.ronde+1} van ${S.rondes}`;
  $("beurt-naam").textContent = `${sp.naam}, jij bent!`;
  $("show-instructie").textContent = "Draai voor je opdracht";
  S.modifier = null;
  {
    await showMoment({kicker:`Ronde ${S.ronde+1} van ${S.rondes}`,icon:"🎤",title:sp.naam.toUpperCase(),sub:"Jij bent aan de beurt",duur:1050});
    ProfessorDecibel.turn(sp.naam);
    ShowIntelligence.beforeTurn(sp.naam);
    $("show-card").classList.remove("show-phase"); void $("show-card").offsetWidth; $("show-card").classList.add("show-phase");
  }
  $("rad-fase").classList.remove("verborgen");
  $("geluid-fase").classList.add("verborgen");
  $("btn-draai").disabled = false;
}
$("btn-draai").onclick = async ()=>{
  $("btn-draai").disabled = true;
  document.querySelectorAll("#rad-groep .wig").forEach(w=>{
    w.style.opacity=""; w.setAttribute("stroke","var(--inkt)"); w.setAttribute("stroke-width","3");
  });
  // kies een vak — kans exact evenredig met de grootte op het rad
  const lot = Math.random()*360;
  let cum = 0, seg = RAD.segmenten[0];
  for(const s of RAD.segmenten){ cum += (s.a2-s.a1); if(lot < cum){ seg = s; break; } }
  S.cat = seg.cat;
  const w = seg.a2 - seg.a1;
  const doelInVak = seg.a1 + w*(.18 + Math.random()*.64);
  const basis = Math.ceil(S.radHoek/360)*360 + 360*3;
  await draaiNaar(basis + (360 - doelInVak), 3300 + Math.random()*500);
  SFX.plof();                                  // het rad valt tegen de pin…
  await draaiNaar(S.radHoek - 2.5, 220);       // …en zakt er iets tegen terug
  document.querySelectorAll("#rad-groep .wig").forEach(wg=>{
    if(wg.dataset.cat === S.cat){ wg.setAttribute("stroke","#fff"); wg.setAttribute("stroke-width","5"); }
    else wg.style.opacity = .35;
  });
  if(w <= 25){ SFX.glinster(); confetti(); }   // jackpot: het kleinste vak!
  await wacht(650);
  const gekozenCat=CATS[S.cat];
  applyCategoryTheme(S.cat);
  AudioDirector.category(S.cat);
  await showMoment({kicker:"Categorie",icon:gekozenCat.emoji,title:gekozenCat.label.toUpperCase(),sub:"Luister goed naar het voorbeeld",duur:1350,type:"category"});
  ProfessorDecibel.category(S.cat);
  toonGeluidFase();
  await wacht(550);
  $("btn-luister").click();
};
function toonGeluidFase(){
  applyCategoryTheme(S.cat);
  const opdracht = pakOpdracht(S.cat);
  S.dier = opdracht.dier;
  S.modifier = opdracht.modifier;
  if((S.dier.difficulty||1)>=4) setTimeout(()=>ProfessorDecibel.speak("difficult"),1550);
  const c = CATS[S.cat];
  $("rad-fase").classList.add("verborgen");
  $("geluid-fase").classList.remove("verborgen");
  $("cat-label").textContent = `${c.emoji} ${c.label}`;
  $("cat-label").style.background = c.kleur;
  $("beest-emoji").textContent = S.dier.emoji;
  $("beest-emoji").classList.remove("speelt");
  $("beest-naam").textContent = S.dier.naam;
  $("beurt-hint").textContent = "Eerst luisteren. Daarna volgt misschien een verrassing.";
  $("show-instructie").textContent = "Luister naar het basisgeluid";
  $("modifier-reveal").classList.add("verborgen");
  $("sound-bars").classList.remove("speelt");
  $("btn-luister").disabled = false;
  $("btn-luister").textContent = "🔊 Speel het geluid";
  $("btn-opnemen").classList.add("verborgen");
  $("telaf").classList.add("verborgen");
  $("meter").classList.add("verborgen");
  $("suspense").classList.add("verborgen");
  $("mic-fout").classList.add("verborgen");
  $("mic-fout").textContent = "";
  $("jury-blok").classList.add("verborgen");
  $("fase-knoppen").classList.remove("verborgen");
  laadDier(S.dier).catch(()=>{});
}
$("btn-luister").onclick = async ()=>{
  $("btn-luister").disabled = true;
  try{ await laadDier(S.dier); }
  catch(e){
    const fout = $("mic-fout");
    fout.classList.remove("verborgen");
    fout.textContent = "Dit geluid kon niet worden geladen. ";
    const b = document.createElement("button");
    b.className = "secundair";
    b.style.marginTop = "8px";
    b.textContent = "🎲 Kies een ander geluid";
    b.onclick = ()=>toonGeluidFase();   // trekt een verse opdracht binnen dezelfde categorie
    fout.appendChild(b);
    $("btn-luister").disabled = false; return;
  }
  $("beest-emoji").classList.add("speelt");
  $("sound-bars").classList.add("speelt");
  $("show-instructie").textContent = "Luister goed…";
  const d = speelDier(S.dier);
  setTimeout(()=>{
    $("beest-emoji").classList.remove("speelt");
    $("sound-bars").classList.remove("speelt");
    $("btn-luister").disabled = false;
    $("btn-luister").textContent = "🔊 Nog eens luisteren";
    if(S.modifier){
      $("modifier-emoji").textContent = S.modifier.emoji;
      $("modifier-tekst").textContent = S.modifier.tekst;
      $("modifier-reveal").classList.remove("verborgen");
      $("show-card").classList.remove("reveal-flash"); void $("show-card").offsetWidth; $("show-card").classList.add("reveal-flash");
      $("show-instructie").textContent = "Verrassing! Voeg dit toe aan je imitatie";
      SFX.glinster();
      ProfessorDecibel.chaos();
    } else {
      $("show-instructie").textContent = "Jij bent aan de beurt";
    }
    $("beurt-hint").textContent = S.modifier ? "Combineer het basisgeluid met de chaos-opdracht." : "Doe het geluid zo overtuigend mogelijk na.";
    $("btn-opnemen").classList.remove("verborgen");
    $("btn-opnemen").classList.add("show-primary");
    $("btn-opnemen").textContent = "🎤 Start jouw optreden";
  }, d*1000+150);
};
function modifierScore(mod, k){
  if(!mod || !k) return null;
  const clamp=n=>Math.max(0,Math.min(100,n));
  const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
  const sd=a=>{ if(!a.length)return 0; const m=avg(a); return Math.sqrt(avg(a.map(x=>(x-m)*(x-m)))); };
  const actief=(k.v||[]).filter(v=>v>.15);
  const toon=(k.p||[]).filter(v=>v!=null);
  const energie=clamp((k.maxRms||0)*620);
  const variatie=clamp(sd(actief)*420 + sd(toon)*150);
  const stoten=clamp((k.events||0)*24 + variatie*.35);
  const melodie=clamp((k.cov||0)*55 + sd(toon)*180 + Math.min(30,(k.duur||0)*5));
  const traag=clamp((k.duur||0)*18 + Math.max(0,45-(k.events||0)*8));
  const zacht=clamp(100-Math.abs(34-energie)*1.6);
  const dynamiek=clamp(energie*.55+variatie*.45);
  const scores={energie,variatie,stoten,melodie,traag,zacht,dynamiek};
  return Math.round(scores[mod.profiel] ?? dynamiek);
}

$("btn-opnemen").onclick = async ()=>{
  if(S.micOk !== true || !micStream){
    const ok = await vraagMic(3000);
    if(!ok){
      $("mic-fout").classList.remove("verborgen");
      $("mic-fout").textContent = "De microfoon werkt niet. Gebruik de jury als noodoplossing.";
      startJury();
      return;
    }
  }
  $("fase-knoppen").classList.add("verborgen");
  $("show-instructie").textContent = "Maak je klaar";
  const t = $("telaf");
  t.classList.add("verborgen");
  for(const n of ["3","2","1","GA!"]){
    AudioDirector.countdown(n);
    await showMoment({kicker:n==="GA!"?"LIVE":"Maak je klaar",icon:n==="GA!"?"🎙️":"",title:n,sub:"",duur:n==="GA!"?420:560,type:"countdown"});
  }
  $("show-instructie").textContent = "LIVE · DOE HET NA";
  AudioDirector.recordStart();
  ProfessorDecibel.liveStart(S.spelers[S.beurt]?.naam||"speler");
  $("meter").classList.remove("verborgen");
  const duur = Math.max(2.5, S.dier.analyse.duur+1.2);
  const opname = await neemOp(duur, lvl=>{ $("meter-vul").style.width = (lvl*100)+"%"; ProfessorDecibel.liveLevel(lvl); });
  $("meter").classList.add("verborgen");
  ProfessorDecibel.liveStop();
  $("show-instructie").textContent = "De computer luistert";
  // tromgeroffel-spanning; ondertussen wordt de opname echt geanalyseerd
  $("suspense").classList.add("verborgen");
  SFX.tromgeroffel();
  AudioDirector.analyse();
  ProfessorDecibel.analyse();
  const analysePromise = analyseerOpname(opname);
  await showMoment({kicker:"Computerjury",icon:"🤖",title:"IK LUISTER…",sub:"Gelijkenis · ritme · timing",duur:1450});
  const resultaat = await analysePromise;
  if(S.laatsteOpname){ URL.revokeObjectURL(S.laatsteOpname); S.laatsteOpname = null; }
  S.laatsteBuffer = resultaat.buffer;
  if(!S.laatsteBuffer && opname.blob && opname.blob.size > 0)
    S.laatsteOpname = URL.createObjectURL(opname.blob);
  const res = berekenScore(S.dier.analyse, resultaat.k);
  const modScore = modifierScore(S.modifier, resultaat.k);
  if(modScore != null && !res.stil){
    const basisRuimer = Math.min(100, Math.round(res.score*1.10 + 4));
    res.score = Math.max(0, Math.min(100, Math.round(basisRuimer*.60 + modScore*.40)));
  }
  toonResultaat(res.score, res.stil, res.delen, res.gewichten, modScore, resultaat.k);
};

function startJury(){
  $("fase-knoppen").classList.add("verborgen");
  $("jury-blok").classList.remove("verborgen");
  $("jury-blok").setAttribute("aria-hidden","false");
  const el = $("jury-knoppen");
  el.innerHTML = "";
  [20,40,60,80,100].forEach((score,i)=>{
    const b=document.createElement("button");
    b.className="secundair";
    b.textContent=`${i+1} ★`;
    b.title=`${score} punten`;
    b.onclick=()=>{
      $("jury-blok").classList.add("verborgen");
      toonResultaat(score,false,null,null,null);
    };
    el.appendChild(b);
  });
}

/* ================= UI: RESULTAAT ================= */
function feedbackVoor(score){
  let f = FEEDBACK[0][1];
  for(const [min,txt] of FEEDBACK) if(score>=min) f = txt;
  return f;
}
function scoreVerdict(score, stil=false){
  if(stil) return "Radiostilte";
  if(score>=95) return "Onnavolgbaar!";
  if(score>=90) return "Legendarisch!";
  if(score>=80) return "Publieksfavoriet!";
  if(score>=70) return "Geweldig!";
  if(score>=55) return "Sterke poging!";
  if(score>=40) return "Lekker geprobeerd!";
  return "Creatieve uitvoering!";
}
function burstParticles(score){
  const laag=$("fx-layer"); if(!laag) return;
  laag.innerHTML="";
  const aantal=score>=90?42:score>=75?28:score>=55?16:8;
  for(let i=0;i<aantal;i++){
    const p=document.createElement("i"); p.className="fx-particle";
    const hoek=(Math.PI*2*i/aantal)+(Math.random()-.5)*.35;
    const afstand=(score>=90?260:190)*(0.55+Math.random()*.65);
    p.style.setProperty("--x",Math.cos(hoek)*afstand+"px");
    p.style.setProperty("--y",Math.sin(hoek)*afstand+"px");
    p.style.setProperty("--s",(.45+Math.random()*1.7).toFixed(2));
    p.style.setProperty("--r",Math.round(Math.random()*360)+"deg");
    p.style.setProperty("--dur",(.75+Math.random()*.7).toFixed(2)+"s");
    if(i%4===0){p.style.borderRadius="2px";p.style.background="var(--geel)"}
    else if(i%5===0){p.style.background="var(--roze)"}
    laag.appendChild(p);
  }
  setTimeout(()=>laag.innerHTML="",1800);
}
function scoreImpact(score){
  document.body.classList.remove("score-flash","micro-shake");
  void document.body.offsetWidth;
  if(score>=75) document.body.classList.add("score-flash");
  if(score>=90) document.body.classList.add("micro-shake");
  burstParticles(score);
  setTimeout(()=>document.body.classList.remove("score-flash","micro-shake"),900);
}
function toonResultaat(score, stil, delen, gewichten, modScore, kenmerken=null){
  const sp = S.spelers[S.beurt];
  sp.score += score;
  const showEvents=ShowIntelligence.afterScore(sp.naam,score,{modifier:!!S.modifier,modifierScore:modScore});
  bewaarSpel();
  toon("scherm-resultaat");
  const resultScreen=$("scherm-resultaat");
  resultScreen.classList.remove("score-reveal","actions-ready");
  // welk geluid was het ook alweer?
  $("res-emoji").textContent = S.dier.emoji;
  $("res-naam").textContent = S.modifier ? `${S.dier.naam} ${S.modifier.tekst}` : S.dier.naam;
  $("res-cat").textContent = `${CATS[S.cat].emoji} ${CATS[S.cat].label}`;
  $("res-cat").style.background = CATS[S.cat].kleur;
  // uitleg van de score
  const uitleg = $("score-uitleg");
  if(delen){
    uitleg.classList.remove("verborgen");
    $("balk-toon").style.width = "0%"; $("balk-ritme").style.width = "0%"; $("balk-tempo").style.width = "0%";
    $("pct-toon").textContent = delen.toon+"%";
    $("pct-ritme").textContent = delen.ritme+"%";
    $("pct-tempo").textContent = delen.tempo+"%";
    setTimeout(()=>{
      $("balk-toon").style.width = delen.toon+"%";
      $("balk-ritme").style.width = delen.ritme+"%";
      $("balk-tempo").style.width = delen.tempo+"%";
    }, 350);
    if(gewichten){
      $("weging").textContent = `Weging bij dit geluid: toon ${gewichten.toon}% · ritme ${gewichten.ritme}% · tempo ${gewichten.tempo}% — de score is de gewogen som.`;
      $("weging").classList.remove("verborgen");
    }
  } else {
    uitleg.classList.add("verborgen");
    $("weging").classList.add("verborgen");
  }
  $("btn-terugluisteren").disabled = !(S.laatsteBuffer || S.laatsteOpname);
  const naald = $("naald");
  naald.style.transform = "rotate(-90deg)";
  const scoreEl=$("score-getal");
  scoreEl.textContent = "0";
  scoreEl.classList.remove("score-land");
  scoreEl.classList.add("counting");
  const verdict=$("score-verdict");
  verdict.textContent=""; verdict.classList.remove("zichtbaar");
  $("score-feedback").classList.remove("zichtbaar");
  $("score-feedback").textContent = stil
    ? "We hoorden… helemaal niks. Probeer het dichter bij de telefoon."
    : feedbackVoor(score) + (modScore != null ? ` · Chaos ${modScore}%` : "");
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>{
    naald.style.transform = `rotate(${-90 + score*1.8}deg)`;
  });});
  let cur = 0;
  const iv = setInterval(()=>{
    cur = Math.min(score, cur + Math.max(1, Math.round(score/40)));
    $("score-getal").textContent = cur;
    AudioDirector.scoreTick(cur);
    if(cur>=score){
      clearInterval(iv);
      scoreEl.classList.remove("counting");
      void scoreEl.offsetWidth;
      scoreEl.classList.add("score-land");
      resultScreen.classList.add("score-reveal");
      verdict.textContent=scoreVerdict(score,stil);
      verdict.classList.add("zichtbaar");
      $("score-feedback").classList.add("zichtbaar");
      scoreImpact(score);
      AudioDirector.score(score);
      ProfessorDecibel.directedScoreReveal(score,stil,{player:sp.naam,modifier:S.modifier,modifierScore:modScore,features:kenmerken,parts:delen,sound:S.dier});
      ShowIntelligence.react(showEvents);
      setTimeout(()=>ShowIntelligence.showStandings(2300),3300);
      if(score>=75){ confetti(score>=90?40:24); SFX.applaus(); }
      else if(score<30 && !stil){ SFX.trombone(); }
      setTimeout(()=>resultScreen.classList.add("actions-ready"),520);
    }
  }, 30);
}
$("btn-terugluisteren").onclick = ()=>{
  if(S.laatsteBuffer){
    const ctx = audio();
    const src = ctx.createBufferSource();
    src.buffer = S.laatsteBuffer;
    src.connect(ctx.destination);
    src.start();
  } else if(S.laatsteOpname){
    new Audio(S.laatsteOpname).play().catch(()=>{});
  }
};
$("btn-origineel").onclick = async ()=>{
  try{ await laadDier(S.dier); speelDier(S.dier); }catch(e){}
};
function confetti(aantal=24){
  const em = ["🎉","⭐","🐐","✨","🎊"];
  for(let i=0;i<aantal;i++){
    const s = document.createElement("div");
    s.className = "confetti";
    s.textContent = em[i%em.length];
    s.style.left = Math.random()*100+"vw";
    s.style.animationDuration = (1.6+Math.random()*1.6)+"s";
    document.body.appendChild(s);
    setTimeout(()=>s.remove(), 3500);
  }
}
$("btn-volgende").onclick = async ()=>{
  S.beurt++;
  if(S.beurt >= S.spelers.length){
    S.beurt = 0; S.ronde++;
    if(S.ronde >= S.rondes){
      ProfessorDecibel.show("De metingen zijn binnen. Ik maak de eindbalans op.",{state:"denkt",duur:5200,emotion:"thinking",voiceKey:"final_calculation"});
      AudioDirector.analyse();
      await showMoment({kicker:"Professor Decibel rekent",icon:"🧮",title:"DE EINDSTAND",sub:"Wie wint de Gouden Geit?",duur:2300,type:"score"});
      toonEinde(); return;
    }
  }
  nieuweBeurt();
};

/* ================= UI: EINDE ================= */
function toonEinde(){
  wisSpel();
  toon("scherm-einde");
  const lijst = [...S.spelers].sort((a,b)=>b.score-a.score);
  const el = $("eind-lijst"); el.innerHTML = "";
  lijst.forEach((sp,i)=>{
    const d = document.createElement("div");
    d.className = "eind-item" + (i===0?" winnaar":"");
    for(const [cls,txt] of [["plek",i===0?"🐐":i+1+"."],["",sp.naam+(i===0?" — de Gouden Geit!":"")],["pts",`${sp.score} pt`]]){
      const s=document.createElement("span"); if(cls)s.className=cls; s.textContent=txt; d.appendChild(s);
    }
    el.appendChild(d);
    setTimeout(()=>d.classList.add("reveal"),180+i*130);
  });
  const sum=ShowIntelligence.summary();
  let summary=$("show-summary");
  if(!summary){ summary=document.createElement("div");summary.id="show-summary";summary.className="show-summary";el.parentElement.appendChild(summary); }
  summary.innerHTML=`<h3>Professor Decibels avondlogboek</h3><div class="show-summary-grid">
    <div class="summary-stat"><strong>${sum.bestScore}</strong><span>hoogste score · ${sum.bestPlayer}</span></div>
    <div class="summary-stat"><strong>${sum.legendary}</strong><span>legendarische scores</span></div>
    <div class="summary-stat"><strong>${sum.chaos}</strong><span>chaosopdrachten</span></div>
    <div class="summary-stat"><strong>${sum.gap}</strong><span>punten verschil met nummer twee</span></div>
  </div>`;
  setTimeout(()=>confetti(42),420);
  SFX.applaus(); AudioDirector.victory();
  setTimeout(()=>ProfessorDecibel.show(`${sum.winner} wint de Gouden Geit met ${sum.score} punten. ${sum.gap<=5?"Een zinderende ontknoping!":"Een overtuigende overwinning."}`,{state:"juicht",duur:7000,emotion:"celebrate",voiceKey:"winner_announcement"}),650);
}
$("btn-opnieuw").onclick = ()=>{
  S.spelers.forEach(s=>s.score=0);
  toon("scherm-setup");
  tekenSpelers();
};

/* ================= JUKEBOX ================= */
$("btn-jukebox").onclick = ()=>{
  const jb = $("jukebox");
  if(!jb.dataset.gevuld){
    for(const cat of Object.keys(CATS)){
      const kop = document.createElement("div");
      kop.className = "kop";
      kop.textContent = `${CATS[cat].emoji} ${CATS[cat].label}`;
      jb.appendChild(kop);
      ACTIEVE_GELUIDEN.filter(d=>d.cat===cat).forEach(d=>{
        const b = document.createElement("button");
        b.textContent = `${d.emoji} ${d.naam}`;
        b.onclick = async ()=>{
          try{ audio(); await laadDier(d); }catch(e){ b.textContent = "⚠️ laadt niet"; return; }
          jb.querySelectorAll("button").forEach(x=>x.classList.remove("speelt-nu"));
          b.classList.add("speelt-nu");
          const s = speelDier(d);
          setTimeout(()=>b.classList.remove("speelt-nu"), s*1000);
        };
        jb.appendChild(b);
      });
    }
    jb.dataset.gevuld = "1";
  }
  jb.classList.toggle("verborgen");
  $("btn-jukebox").textContent = jb.classList.contains("verborgen")
    ? "🎧 Geluiden beluisteren" : "🎧 Geluiden verbergen";
};

$("audio-toggle").onclick=()=>{ AudioDirector.ensure(); AudioDirector.setMuted(!AudioDirector.muted); };
AudioDirector.setMuted(AudioDirector.muted);

async function initialiseerBeestenboel(){
await laadEigenGeluiden();
$("ondertitel").textContent = `${ACTIEVE_GELUIDEN.length} basisgeluiden · unieke chaosopdrachten · computerbeoordeling met juryfallback`;
tekenSpelers();
bouwRad();

// staat er nog een onafgemaakt potje klaar?
(function(){
  const d = laadSpel();
  if(!d) return;
  const b = $("btn-hervat");
  b.classList.remove("verborgen");
  b.textContent = `▶️ Hervat potje — ronde ${d.ronde+1}, ${d.spelers.map(s=>s.naam).join(", ")}`;
  b.onclick = ()=>{
    try{ audio(); }catch(e){}
    const perId = {}; ACTIEVE_GELUIDEN.forEach(x=>perId[x.id]=x);
    S.spelers = d.spelers; S.rondes = d.rondes; S.ronde = d.ronde; S.beurt = d.beurt;
    S.gebruikteOpdrachten = new Set(d.opdrachten||[]);
    S.gebruikteBasis = new Set((d.basisGebruikt||[]).filter(id=>perId[id]));
    ShowIntelligence.reset();
    houdSchermWakker();
    SFX_NAMEN.forEach(n=>sfxBuffer(n).catch(()=>{}));
    nieuweBeurt();
    vraagMic(3500);
  };
})();
}
initialiseerBeestenboel();


/* ===== PROFESSOR DECIBEL 3.0 — SPRINT 4+5: PRESTATIE + LIVE REGIE ===== */
ProfessorDecibel.performanceHistory = [];
ProfessorDecibel.liveState = {active:false,peak:0,energy:0,changes:0,lastBand:""};
ProfessorDecibel.humorChance = .24;
ProfessorDecibel.silenceChance = .16;
ProfessorDecibel.showCount = Number(localStorage.getItem("bb_pd_show_count")||0);

ProfessorDecibel.performanceLines = {
  energyHigh:[
    "Wat een energie. Mijn decibelmeter vraagt om een korte pauze.",
    "Daar zat overtuiging in. En vermoedelijk ook een extra long.",
    "Vol overgave. Mijn laboratoriumramen trillen nog na.",
    "Krachtig uitgevoerd. Dat noemen we akoestisch leiderschap.",
    "Je hield niets achter. Mijn apparatuur waardeert de eerlijkheid."
  ],
  energyLow:[
    "Mooi beheerst. Bijna alsof je mijn buren wilde sparen.",
    "Subtiel uitgevoerd. Mijn microfoon moest even dichterbij komen.",
    "Voorzichtig, maar met aandacht. Ook fluisterwetenschap telt.",
    "Je koos voor finesse. Mijn meters houden wel van een uitdaging."
  ],
  varied:[
    "Veel afwisseling. Mijn grafiek ziet eruit als een berglandschap.",
    "Sterke dynamiek. Je gaf het geluid een heel eigen verhaal.",
    "Daar gebeurde van alles — en wonder boven wonder werkte het.",
    "Mooi opgebouwd. Mijn meetlijn kon je nauwelijks bijhouden."
  ],
  rhythmic:[
    "De timing zat goed. Mijn metronoom knikte instemmend.",
    "Netjes in het ritme. Dat is akoestisch vakwerk.",
    "Sterke timing. Zelfs mijn pendule deed spontaan mee.",
    "Je raakte de puls. Mijn laboratorium swingt nog na."
  ],
  melodic:[
    "Daar zat melodie in. Mijn stemvork is onder de indruk.",
    "Mooi toonverloop. Bijna concertwaardig — bijna.",
    "Je gaf het geluid onverwacht veel muzikaliteit.",
    "Dat zong lekker door. Mijn snor trilde in majeur."
  ],
  accurate:[
    "Het origineel was direct herkenbaar. Uitstekend waargenomen.",
    "Heel raak. Mijn vergelijkingsmeter sloeg meteen groen uit.",
    "Sterke gelijkenis. Daar kan de bron trots op zijn.",
    "Je zat opvallend dicht bij het voorbeeld. Wetenschappelijk verdacht goed."
  ],
  creative:[
    "Het origineel nam een omweg, maar de bestemming was vermakelijk.",
    "Creatieve vrijheid. Mijn apparatuur heeft er een nieuwe categorie voor gemaakt.",
    "Niet exact volgens het boekje — wel een bijzonder hoofdstuk.",
    "Je koos een eigen route. Mijn laboratorium had die niet voorspeld."
  ],
  chaosGreat:[
    "Je volgde de chaosopdracht uitstekend. De wetenschap capituleert.",
    "Basisgeluid én extra opdracht: allebei raak. Dat is dubbel vakwerk.",
    "De modifier was glashelder. Mijn algoritme moest er even van glimlachen.",
    "Dit ging precies de goede verkeerde kant op. Prachtig."
  ],
  chaosOkay:[
    "De chaos was aanwezig. Nog net binnen de grenzen van mijn verzekering.",
    "Ik hoorde de extra opdracht — voorzichtig, maar onmiskenbaar.",
    "Een keurige dosis wanorde. Mijn laboratorium blijft voorlopig staan.",
    "De modifier kwam door. Mijn meetapparatuur noemt het: interessant."
  ],
  silence:[
    "Een buitengewoon zuivere stilte. Helaas was dat niet de opdracht.",
    "Mijn microfoon hoorde vooral zichzelf nadenken.",
    "Akoestisch minimalisme. Heel gedurfd.",
    "De stilte was overtuigend. Het geluid houdt zich nog schuil."
  ],
  genericWarm:[
    "Mooi geprobeerd. Ik hoor mogelijkheden.",
    "Daar zat karakter in. Dat noteer ik.",
    "Een eerlijke uitvoering. Mijn apparatuur waardeert inzet.",
    "Interessant. Heel interessant."
  ]
};

ProfessorDecibel.soundHumor = {
  koe:["Moe-izaam? Zeker niet. Deze koe stond stevig in de wei.","Mijn melkonderzoek krijgt hiermee een onverwachte wending."],
  kip:["Gelukkig leggen we geen punten-eieren.","Deze kip had duidelijk podiumervaring."],
  haan:["Een haan met ambitie. De ochtend kan beginnen.","Mijn wekker voelt zich bedreigd."],
  kikker:["Keurig gekwaakt. De vijverjury is tevreden."],
  leeuw:["Mijn laboratorium is ineens een savanne.","De koning van de jungle keurt dit vermoedelijk goed."],
  ezel:["Een overtuigende balk. Mijn boekenplank antwoordde bijna."],
  baby:["Mijn meetapparatuur wil nu spontaan een flesje.","Dat klonk alsof de middagdut definitief voorbij is."],
  chewbacca:["Zelfs een sterrenstelsel ver weg hoorde dit.","Mijn harige collega zou instemmend grommen."],
  darth:["De kracht was aanwezig. De ademhaling ook.","Mijn ventilatiesysteem voelt zich geïmiteerd."],
  homer:["D’oh! Mijn meter had hem meteen.","Kort, krachtig en geelwaardig."],
  mario:["Dat leverde een mooie punten-power-up op.","Geen game over. Integendeel."],
  pikachu:["Een elektrische uitvoering. Mijn zekeringkast is alert.","Pika-pika-prachtig gemeten."],
  minecraft:["Stevig blokkenwerk.","Mijn scoremodel is volledig gecubificeerd."],
  scooby:["Mysterie opgelost: dit was behoorlijk herkenbaar.","Daar hoeft geen pratende hond meer aan te pas te komen."],
  paard:["Mijn hoefslagmeter is tevreden.","Dat galoppeerde uitstekend door de microfoon."],
  beatbox:["Mijn metronoom vraagt om je telefoonnummer.","Dat was ritmisch verantwoord onderzoek."],
  jodel:["Mijn echo kwam drie keer terug met complimenten.","De Alpen hebben zojuist teruggebeld."],
  trump:["Een grootse uitvoering. Zoals aangekondigd.","Mijn microfoon noemt dit een zeer belangrijke meting."]
};

ProfessorDecibel.pickFresh = function(pool){
  if(!pool||!pool.length)return "Interessant.";
  const candidates=pool.filter(x=>!this.performanceHistory.includes(x));
  const line=(candidates.length?candidates:pool)[Math.floor(Math.random()*(candidates.length||pool.length))];
  this.performanceHistory.push(line); if(this.performanceHistory.length>24)this.performanceHistory.shift();
  return line;
};
ProfessorDecibel.featureProfile = function({features,parts,modifierScore,score,stil}){
  const v=(features?.v||[]).filter(x=>x>.12), p=(features?.p||[]).filter(x=>x!=null);
  const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
  const sd=a=>{if(!a.length)return 0;const m=avg(a);return Math.sqrt(avg(a.map(x=>(x-m)**2)))};
  const energy=Math.min(100,(features?.maxRms||0)*620);
  const variation=Math.min(100,sd(v)*430+sd(p)*160);
  const rhythm=Math.min(100,(features?.events||0)*23+variation*.28);
  const melody=Math.min(100,(features?.cov||0)*55+sd(p)*180);
  const accuracy=parts?Math.round((parts.toon+parts.ritme+parts.tempo)/3):score;
  return {energy,variation,rhythm,melody,accuracy,modifierScore:modifierScore??0,stil};
};
ProfessorDecibel.performanceComment = function(ctx){
  const f=this.featureProfile(ctx), pools=this.performanceLines;
  if(ctx.stil)return this.pickFresh(pools.silence);
  if(ctx.modifier && f.modifierScore>=78)return this.pickFresh(pools.chaosGreat);
  if(ctx.modifier && f.modifierScore>=58)return this.pickFresh(pools.chaosOkay);
  const candidates=[];
  if(f.accuracy>=78)candidates.push("accurate");
  if(f.energy>=76)candidates.push("energyHigh"); else if(f.energy<30)candidates.push("energyLow");
  if(f.variation>=62)candidates.push("varied");
  if(f.rhythm>=68)candidates.push("rhythmic");
  if(f.melody>=62)candidates.push("melodic");
  if(ctx.score<55)candidates.push("creative");
  const key=candidates.length?candidates[Math.floor(Math.random()*candidates.length)]:"genericWarm";
  return this.pickFresh(pools[key]);
};
ProfessorDecibel.contextJoke = function(sound){
  if(Math.random()>this.humorChance||!sound)return null;
  const hay=((sound.id||"")+" "+(sound.naam||"")).toLowerCase();
  const key=Object.keys(this.soundHumor).find(k=>hay.includes(k));
  return key?this.pickFresh(this.soundHumor[key]):null;
};
ProfessorDecibel.liveStart = function(player){
  clearTimeout(this.timer); this.liveState={active:true,peak:0,energy:0,changes:0,lastBand:""};
  const el=$("professor-decibel"); if(!el)return;
  el.className="professor-decibel zichtbaar live-watch live-soft";
  el.setAttribute("aria-hidden","false");
  $("pd-text").textContent=`${player}, ik luister mee.`;
  this.startBlinking?.();
};
ProfessorDecibel.liveLevel = function(level){
  if(!this.liveState.active)return;
  const el=$("professor-decibel");if(!el)return;
  this.liveState.peak=Math.max(this.liveState.peak,level);
  this.liveState.energy=this.liveState.energy*.82+level*.18;
  const band=level>.68?"big":level>.28?"good":"soft";
  if(band!==this.liveState.lastBand){this.liveState.changes++;this.liveState.lastBand=band;}
  el.classList.remove("live-soft","live-good","live-big");el.classList.add("live-"+band);
};
ProfessorDecibel.liveStop = function(){
  this.liveState.active=false;
  const el=$("professor-decibel");if(!el)return;
  el.classList.add("afscheid");
  setTimeout(()=>{el.className="professor-decibel";el.setAttribute("aria-hidden","true")},430);
};
ProfessorDecibel.silentBeat = function(state="eyebrow",duration=900){
  return new Promise(resolve=>{
    const el=$("professor-decibel");if(!el){resolve();return}
    clearTimeout(this.timer);el.className=`professor-decibel zichtbaar silent-reaction ${state}`;el.setAttribute("aria-hidden","false");
    this.timer=setTimeout(()=>{el.classList.add("afscheid");setTimeout(()=>{el.className="professor-decibel";el.setAttribute("aria-hidden","true");resolve()},390)},duration);
  });
};
ProfessorDecibel.directedScoreReveal = function(score,stil,ctx={}){
  const comment=this.performanceComment({...ctx,score,stil});
  const joke=this.contextJoke(ctx.sound);
  const high=score>=80, top=score>=92;
  const delay=top?500:score<40?680:360;
  setTimeout(async()=>{
    if(Math.random()<this.silenceChance || top){
      await this.silentBeat(top?"proud":"eyebrow",top?780:980);
    }
    const prefix=top?"Dat… was indrukwekkend. ":score>=75?"Heel sterk. ":score<40?"Ik heb mijn berekeningen gecontroleerd. ":"";
    const line=prefix+comment+(joke?" "+joke:"");
    const state=top?"juicht":high?"proud":score<40?"note":"praat";
    this.show(line,{state,duur:Math.min(7600,4200+line.length*24),emotion:top?"celebrate":high?"happy":"warm",voiceKey:"performance_comment"});
  },delay);
};
