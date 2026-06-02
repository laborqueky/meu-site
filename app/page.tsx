'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// --- COMPONENTES DE INTERFACE DE APOIO ---
function SectionTitle({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) {
  return (
    <div className="text-center space-y-3 mb-16">
      <span className={`text-sm uppercase tracking-[0.3em] ${light ? 'text-[#FDF8F0]/60' : 'text-[#C5A059]'}`}>{subtitle}</span>
      <h2 className={`text-4xl md:text-5xl font-serif font-bold ${light ? 'text-[#FDF8F0]' : 'text-[#C5A059]'}`}>{title}</h2>
    </div>
  );
}

function ServiceCard({ name, description, duration, dark = false }: { name: string, description: string, duration: string, dark?: boolean }) {
  return (
    <div className={`${dark ? 'bg-[#C5A059]/10 border-[#FDF8F0]/20' : 'bg-white border-[#C5A059]/10'} p-8 rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group`}>
      <div className="space-y-4">
        <h3 className={`text-xl font-serif font-bold ${dark ? 'text-[#FDF8F0]' : 'text-[#C5A059]'} group-hover:opacity-80`}>{name}</h3>
        <p className={`text-sm ${dark ? 'text-[#FDF8F0]/80' : 'text-[#C5A059]/80'} leading-relaxed font-light whitespace-pre-line`}>{description}</p>
      </div>
      <div className={`mt-8 pt-4 border-t ${dark ? 'border-[#FDF8F0]/10' : 'border-[#C5A059]/5'} flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] ${dark ? 'text-[#FDF8F0]/60' : 'text-[#C5A059]/40'}`}>
        <span>Duração</span><span className={dark ? 'text-[#FDF8F0]' : 'text-[#C5A059]/60'}>{duration}</span>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#C5A059]/20 pb-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4 text-[#C5A059] font-serif font-bold text-lg md:text-xl transition-all group">
        <span className="group-hover:opacity-80">{question}</span>
        <span className="text-2xl font-light">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 mt-2 pb-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-[#C5A059]/70 font-light leading-relaxed font-sans whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
}

// --- TEXTOS E CONFIGURAÇÕES MODULARIZADAS (EVITA ERROS DE COMPILAÇÃO) ---
const GESTANTE_TEXT = `A gestação é um período de muitas mudanças no corpo e nas emoções da mulher. A massagem para gestantes pode ser uma grande aliada no alívio de desconfortos físicos e na promoção do bem-estar, desde que realizada com os cuidados adequados. Em geral, você pode realizar massagens específicas e adaptadas para esse período, sempre respeitando as necessidades individuais de cada fase da sua gestação.`;

const CUIDADO_TEXT = `Cada atendimento é realizado por mim de forma totalmente personalizada, respeitando o seu conforto, a sua segurança e as necessidades de cada futura mamãe, proporcionando um momento de relaxamento, acolhimento e autocuidado.`;

const CANCEL_TEXT = `Para confirmar o seu horário, solicito um sinal de 50% do valor da sessão via PIX (CNPJ: 58.737.355/0001-48), com o envio do comprovante no ato da solicitação.

O cancelamento ou reagendamento pode ser feito com até 12h de antecedência. Após esse período, o sinal não será reembolsado. Essa medida é necessária porque meu deslocamento já foi organizado e o bloqueio da agenda impede que outro cliente ocupe a vaga, que poderia ser direcionada a quem precisa.`;

const ETHIC_TEXT = `Realizo exclusivamente práticas terapêuticas, profissionais e de bem-estar. Não realizo nenhum tipo de atendimento ou prática de cunho sexual. Quaisquer mensagens, insinuações ou condutas inadequadas resultarão no bloqueio imediato do contato e denúncia formal às autoridades competentes! Prezo pelo respeito mutuo em meu trabalho.`;

const MIOFASCIAL_TEXT = `Técnica terapêutica que atua nas fáscias, tecidos que envolvem músculos, articulações e estruturas do corpo. Por meio de pressões específicas e alongamentos, ajuda a liberar tensões, aderências e restrições de movimento, promovendo alívio da dor, melhora da mobilidade e maior consciência corporal.

Benefícios:
• Alívio de dores musculares e tensões crônicas
• Melhora da flexibilidade e amplitude dos movimentos
• Redução de pontos de tensão e desconfortos posturais
• Auxílio na recuperação física e esportiva
• Sensação de leveza e bem-estar corporal

Valores sob consulta.`;

const DEEP_THERMAL_TEXT = `Uma experiência sensorial criada para envolver corpo e mente através do conforto do calor e do toque terapêutico. O ritual inicia com um escalda pés aromático, seguido pela aplicação de óleo vegetal aquecido e pedras quentes que deslizam suavemente pelo corpo, promovendo uma sensação profunda de acolhimento, leveza e desaceleração.`;

const MIND_SCALP_TEXT = `Terapia focada no relaxamento da mente, couro cabeludo, face e região cervical.

Indicada para:
• Estresse e cansaço mental
• Tensão facial e dor na região cervical
• Bruxismo e enxaquecas tensionais`;

// --- COMPONENTES DA PÁGINA ---
function Hero() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center bg-[#FDF8F0] text-[#C5A059] p-6 text-center">
      <div className="max-w-3xl space-y-8">
        <header className="space-y-4">
          <span className="text-sm uppercase tracking-[0.4em] opacity-60">A Ciência do Cuidado</span>
          <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tighter text-[#C5A059]">Reis SPA</h1>
          <p className="text-xl md:text-2xl font-light italic text-[#C5A059]/80">Onde o toque se torna intenção.</p>
        </header>
        <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
          <a href="https://wa.me/5512982000105" target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-[#C5A059] text-[#FDF8F0] rounded-full font-bold shadow-xl hover:scale-105 transition-all text-center">Agendar Sessão</a>
          <a href="#servicos" className="px-12 py-5 border border-[#C5A059]/30 text-[#C5A059] rounded-full font-medium hover:bg-[#C5A059]/5 transition-all text-center">Explorar Menu</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="historia" className="py-24 px-6 bg-[#C5A059] text-[#FDF8F0]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-[3rem] shadow-2xl border border-[#FDF8F0]/20">
          <Image src="/perfil (3).jpg" alt="Rebeca Gonçalves - Reis SPA" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" priority />
        </div>
        <div className="space-y-8">
          <header className="space-y-2">
            <span className="text-[#FDF8F0]/60 font-medium uppercase tracking-[0.3em] text-xs">Minha Essência</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight text-white">O Toque que Transforma</h2>
          </header>
          <div className="space-y-6 text-[#FDF8F0]/90 text-lg font-light leading-relaxed font-sans">
            <p>O corpo não é apenas uma estrutura física; é o lugar onde guardamos nossas memórias, tensões e história.</p>
            <p>No meu espaço, conduzo a massoterapia como um ritual de retorno a si mesmo. Através do meu acolhimento sensorial, cuido pessoalmente de cada detalhe — temperatura, aroma e silêncio — para que seu corpo possa, finalmente, ser ouvido.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="py-24 px-6 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto space-y-24">
        <div>
          <SectionTitle subtitle="Tratamento & Funcionalidade" title="Massagens Terapêuticas" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard name="Massagem Terapêutica Funcional" description="Um protocolo completo desenvolvido por mim para tratar a causa das dores e tensões. Integro de forma estratégica manobras profundas, alongamentos de Thai Massage, pedras quentes e ventosaterapia. Atuo na liberação muscular profunda, melhora da mobilidade, estímulo da circulação e redução de sobrecargas." duration="75 min" />
            <ServiceCard name="Massagem Terapêutica" description="Técnica indicada para quem sente dores musculares, tensão crônica ou fadiga física. Meu toque terapêutico profundo ajuda a aliviar os desconfortos localizados, relaxa a musculatura e ativa a circulação, restaurando seu corpo e trazendo sensação de leveza imediata." duration="60 min / 75 min" />
            <ServiceCard name="Massagem Integrativa" description="Uma experiência totalmente personalizada que combino de acordo com o que seu corpo precisa no momento do atendimento. Do relaxamento profundo à revitalização muscular, planejo cada toque para equilibrar seu corpo e mente (Exceto rituais Ayurvédicos)." duration="75 min" />
            <ServiceCard name="Liberação Miofascial" description={MIOFASCIAL_TEXT} duration="60 min / 80 min" />
          </div>
        </div>
        <div>
          <SectionTitle subtitle="Experiências Sensoriais" title="Rituais de Relaxamento" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard name="Deep Thermal Experience" description={DEEP_THERMAL_TEXT} duration="80 min" />
            <ServiceCard name="Hot Stones Massage (Pedras Quentes)" description="Experiência terapêutica profunda onde uno o calor das pedras vulcânicas aquecidas com técnicas de deslizamento. O calor penetrante derrete as tensões acumuladas, solta a musculatura, estimula a circulação e reduz o estresse, convidando sua mente a encontrar o silêncio absoluto." duration="60 min" />
            <ServiceCard name="Candle Massage (Massagem com Velas)" description="Uma deliciosa experiência sensorial onde combino o calor suave da vela cosmética derretida com movimentos terapêuticos. O óleo morno hidrata profundamente a pele, deixando-a macia e nutrida, enquanto meu toque relaxante alivia tensões e traz leveza interna." duration="60 min" />
            <ServiceCard name="Ritual Flor & Raiz" description="Um cuidado completo que conecta corpo e mente. Inicio com o Spa dos Pés (escalda-pés com ervas e aromas, esfoliação ativadora e hidratação nutritiva). Em seguida, aplico uma drenagem facial delicada, máscara revitalizante, massagem com pedras de Jade e finalizo com uma relaxante massagem no couro cabeludo." duration="50 min" />
            <ServiceCard name="Reflexologia Podal e Escalda-Pés" description="Um ritual dedicado ao alívio dos seus pés. Começo com um escalda-pés relaxante, seguido de esfoliação suave renovadora e hidratação profunda. Finalizo com a reflexologia, estimulando pontos estratégicos que promovem o equilíbrio e o alívio de tensões em todo o seu organismo." duration="30 min" />
            <ServiceCard name="Massagem Relaxante" description="Aplico esta técnica com o principal objetivo de reduzir os níveis de estresse e a rigidez muscular, promovendo profundo bem-estar. Ajudo a acalmar seus pensamentos agitados, melhorar a circulação sanguínea e restaurar as energias corporais. Ideal para quem busca uma pausa." duration="60 min / 75 min" />
            <ServiceCard name="Massagem Detox" description="Uma técnica altamente revigorante onde uno o relaxamento profundo das manobras musculares ao estímulo preciso da drenagem linfática. Sinta seu corpo se revitalizar com a eliminação de toxinas, circulação ativada e leveza duradoura." duration="60 min" />
          </div>
        </div>
        <div className="bg-[#C5A059] p-12 rounded-[3rem] shadow-2xl border border-[#FDF8F0]/20">
          <SectionTitle subtitle="Tradição Indiana Milenar" title="Ayurveda: Medicina do Toque" light />
          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard name="Massagem Ayurvédica Abhyanga" description="A técnica clássica do Ayurveda baseada na oleação profunda (snehana) com óleos aquecidos. Minha essência aqui é nutrir, acalmar e estabilizar. Acalmo profundamente o seu sistema nervoso, reduzo o estresse e devolvo ao corpo e à mente agitada (Vata) a memória do aconchego celular." duration="60 min / 75 min" dark />
            <ServiceCard name="Massagem Ayurvédica Shiro Abhyanga" description="Uma terapia indiana focada e profunda que dedico inteiramente às regiões da cabeça, pescoço e ombros. Realizo as manobras com óleos mornos selecionados para suavizar a tensão muscular acumulada nessa área, aliviar o estresse mental e induzir a um sono reparador." duration="45 min" dark />
          </div>
        </div>
        <div>
          <SectionTitle subtitle="Cuidados Dedicados" title="Sessões Específicas" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard name="Mind & Scalp Therapy" description={MIND_SCALP_TEXT} duration="45 min" />
            <ServiceCard name="Drenagem Linfática" description="Utilizo manobras suaves, lentas e ritmadas que estimulam o sistema linfático, auxiliando na eliminação natural de toxinas e na redução eficiente do inchaço corporal, melhorando a retenção de líquidos com foco no seu equilíbrio interno." duration="60 min" />
            <ServiceCard name="Massagem Energizante com Reiki" description="Um mergulho na sua transformação energética. Combina o toque sutil com a canalização da energia universal do Reiki. O uso de cristais estratégicos, como a selenita, atua diretamente nos seus centros energéticos, deixando você plenamente renovado(a)." duration="60 min" />
            <ServiceCard name="Massagem Infantil" description="Momento de cuidado e carinho pensado especialmente para os pequenos. Ajudo a acalmar, relaxar a musculatura, melhorar o sono e fortalecer os vínculos afetivos. Você também pode aprender a realizar as manobras de forma segura comigo." duration="60 min" />
            <ServiceCard name="Doce Espera: Noivas e Casamentos" description="Prepare-se para o seu grande dia com a atenção e o cuidado que você merece! Ofereço sessões personalizadas de massagem, esfoliação e hidratação, pensadas para deixar seu corpo e mente relaxados, leves e radiantes. Cuido de cada detalhe para você." duration="Consulte" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PregnancyCare() {
  const beneficios = ["Alívio de dores lombares e tensão muscular;", "Redução de inchaços e retenção de líquidos;", "Melhora da circulação sanguínea;", "Relaxamento físico e mental;", "Auxílio na qualidade do sono;", "Sensação de acolhimento e bem-estar."];
  const restricoes = ["Gravidez de risco;", "Sangramentos ou contrações;", "Dores intensas sem diagnóstico;", "Pressão arterial descontrolada;", "Descolamento placentário;", "Qualquer orientação médica contrária."];
  return (
    <section id="maternidade" className="py-24 px-6 bg-white text-[#C5A059]">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-sm uppercase tracking-[0.3em] text-[#C5A059]/60">Maternidade</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Massagem para Gestantes</h2>
          <p className="text-[#C5A059]/70 italic max-w-3xl mx-auto font-light pt-2 font-sans text-sm md:text-base leading-relaxed">{GESTANTE_TEXT}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          <div className="bg-[#FDF8F0] p-10 rounded-[3rem] border border-[#C5A059]/10 space-y-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">Benefícios da Massagem</h3>
              <ul className="space-y-3 text-sm text-[#C5A059]/80 font-light font-sans">
                {beneficios.map((item, i) => <li key={i} className="flex gap-3 items-start"><span>🤍</span> {item}</li>)}
              </ul>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-[#C5A059]/20 space-y-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#B38E46] mb-4">Quando não é indicada?</h3>
              <p className="text-sm text-[#C5A059]/70 font-light font-sans leading-relaxed mb-4">Em algumas situações, é importante ter uma <strong>avaliação e liberação médica</strong> prévia antes do nosso atendimento, como em casos de:</p>
              <ul className="space-y-3 text-sm text-[#C5A059]/70 font-light font-sans">
                {restricoes.map((item, i) => <li key={i} className="flex gap-3 items-start"><span className="text-red-400/60">•</span> {item}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#C5A059] text-[#FDF8F0] p-10 md:p-12 rounded-[3rem] text-center max-w-4xl mx-auto space-y-6 shadow-xl">
          <h3 className="text-2xl font-serif font-bold italic text-white">Meu Cuidado com Cada Gestante</h3>
          <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto font-sans">{CUIDADO_TEXT}</p>
          <div className="pt-4 border-t border-[#FDF8F0]/20 max-w-xl mx-auto">
            <p className="text-xs opacity-90 font-sans tracking-wide italic">*Eu sempre peço para você chegar um pouco antes do horário agendado para uma breve conversa e para preenchermos juntas a sua ficha de anamnese.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const depoimentos = [
    { img: "/depoimento 1.jpeg", nome: "Cliente Reis SPA", texto: "Uma experiência revigorante em Ilhabela. O atendimento superou todas as expectativas de relaxamento.", tratamento: "Massagem Terapêutica" },
    { img: "/depoimento 2.jpeg", nome: "Cliente Reis SPA", texto: "O cuidado com os detalhes é impressionante. Me senti acolhida desde o primeiro momento do Ritual Flor & Raiz.", tratamento: "Ritual Flor & Raiz" },
    { img: "/depoimento 3.jpeg", nome: "Cliente Reis SPA", texto: "Alívio imediato para as tensões do dia a dia. A técnica aplicada é impecável e o ambiente muito sofisticado.", tratamento: "Terapêutica Funcional" },
    { img: "/depoimento 4.jpeg", nome: "Cliente Reis SPA", texto: "O vale presente é o gesto perfeito de cuidado. Um momento de puro luxo e bem-estar.", tratamento: "Experiência Personalizada" }
  ];
  const next = () => setCurrent((current + 1) % depoimentos.length);
  const prev = () => setCurrent((current - 1 + depoimentos.length) % depoimentos.length);
  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [current]);
  return (
    <section id="depoimentos" className="py-24 px-6 bg-[#FDF8F0]">
      <div className="max-w-5xl mx-auto space-y-12">
        <SectionTitle subtitle="Relatos de Bem-estar" title="A Voz do Cliente" />
        <div className="relative overflow-hidden bg-white rounded-[3rem] border border-[#C5A059]/10 shadow-2xl">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {depoimentos.map((item, index) => (
              <div key={index} className="min-w-full grid md:grid-cols-2 items-center">
                <div className="relative h-[400px] md:h-[550px] w-full">
                  <Image src={item.img} alt={item.nome} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#C5A059]/20 to-transparent"></div>
                </div>
                <div className="p-10 md:p-16 space-y-6">
                  <span className="text-6xl text-[#C5A059]/20 font-serif leading-none">“</span>
                  <p className="text-[#C5A059]/80 text-xl italic font-light leading-relaxed">{item.texto}</p>
                  <div className="pt-8 border-t border-[#C5A059]/5">
                    <h4 className="font-serif font-bold text-[#C5A059] text-2xl">{item.nome}</h4>
                    <span className="text-xs uppercase tracking-widest text-[#C5A059]/40">{item.tratamento}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 right-8 flex gap-4">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all backdrop-blur-sm bg-white/50">←</button>
            <button onClick={next} className="w-12 h-12 rounded-full border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all backdrop-blur-sm bg-white/50">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Addons() {
  return (
    <section className="py-20 bg-[#C5A059] text-[#FDF8F0]">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <SectionTitle subtitle="Potencialize seu Cuidado" title="Adicionais de Terapia" light />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Mais 20 min da Terapia Escolhida", "Ventosaterapia (20 min)", "Drenagem Facial (20 min)", "Reflexologia (20 min)"].map((item, i) => (
            <div key={i} className="p-4 border border-[#FDF8F0]/30 rounded-2xl flex justify-between items-center hover:bg-[#FDF8F0]/10 transition-colors bg-white/5">
              <span className="font-light">{item}</span>
              <span className="font-bold text-sm">R$ 65</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftVoucher() {
  return (
    <section className="py-24 bg-[#FDF8F0]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-[#C5A059]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-bl-full"></div>
          <div className="space-y-6 relative z-10 text-[#C5A059]">
            <span className="text-[#C5A059]/60 font-bold uppercase tracking-widest text-xs">Presenteie com Bem-estar</span>
            <h2 className="text-4xl font-serif font-bold">Vale Presente Reis SPA</h2>
            <p className="text-[#C5A059]/70 leading-relaxed italic">Um gesto delicado de cuidado e tempo para quem você ama.</p>
            <ul className="grid md:grid-cols-2 gap-4 text-sm text-[#C5A059]/60">
              <li>• Opções específicas ou flexíveis</li>
              <li>• Validade de 1 semana</li>
              <li>• Pagamento total no ato</li>
              <li>• Transferível e não reembolsável</li>
            </ul>
            <p className="text-xs opacity-70 mt-4 italic">Para enviar o vale personalizado, preciso apenas que me informe o nome e o WhatsApp do presenteado. Eu cuidarei do envio com todo o conforto e praticidade.</p>
            <a href="#contato" className="inline-block mt-6 px-10 py-4 bg-[#C5A059] text-[#FDF8F0] rounded-full font-bold hover:scale-105 transition-all shadow-lg text-center">Solicitar Vale</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Guidelines() {
  const orientacoes = ["Venha com roupas leves e confortáveis;", "Evite refeições pesadas pouco antes da sessão;", "Procure chegar alguns minutos antes do horário agendado;", "Mantenha-se hidratado(a) antes e após a massagem;", "Informe-me previamente caso esteja com dores, lesões, gestação ou alguma condição de saúde específica;", "Evite vir com acessórios em excesso, como colares, cintos e brincos grandes;", "Permita-se relaxar: durante a sessão, tente desacelerar a mente e respirar profundamente."];
  return (
    <section id="orientacoes" className="py-24 px-6 bg-white text-[#C5A059]">
      <div className="max-w-4xl mx-auto space-y-12 bg-[#FDF8F0] p-12 rounded-[3rem] border border-[#C5A059]/10 shadow-xl">
        <div className="text-center space-y-3">
          <span className="text-sm uppercase tracking-[0.3em] text-[#C5A059]/60">Preparação</span>
          <h2 className="text-4xl font-serif font-bold">Orientações Antes da sua Sessão</h2>
          <p className="text-[#C5A059]/70 italic max-w-2xl mx-auto font-light pt-2 font-sans text-sm md:text-base">Para que sua experiência seja ainda mais confortável, relaxante e proveitosa, separei algumas recomendações importantes antes do nosso atendimento:</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
          {orientacoes.map((item, i) => <div key={i} className="flex gap-4 items-start"><span className="text-[#C5A059] font-light text-xl">✨</span><p className="text-sm text-[#C5A059]/80 font-light leading-relaxed font-sans">{item}</p></div>)}
        </div>
        <div className="text-center pt-8 border-t border-[#C5A059]/10 max-w-xl mx-auto">
          <p className="text-sm italic text-[#C5A059]/80 font-light">Meu objetivo é proporcionar um momento de cuidado, bem-estar e acolhimento para que você aproveite cada minuto da sua experiência. ✨🤍</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    { question: "Como funciona a confirmação de agendamento e a política de cancelamento?", answer: CANCEL_TEXT },
    { question: "Quais são as diretrizes de ética e conduta do atendimento?", answer: ETHIC_TEXT },
    { question: "Gestantes podem realizar os rituais?", answer: "Sim! Inclusive preparei uma seção inteira acima detalhando os cuidados, benefícios e restrições. Tenho protocolos e adaptações totalmente seguras para gestantes, como a Drenagem Linfática. Recomendo sempre me informar previamente e obter a liberação do seu médico obstetra." },
    { question: "Preciso levar alguma roupa específica para a sessão?", answer: "Não é necessário trazer nada. Ofereço uma infraestrutura completa com enxoval higienizado, confortável e os descartáveis necessários, além de todo o acolhimento sensorial para que sua única preocupação seja relaxar." }
  ];
  return (
    <section id="faq" className="py-24 px-6 bg-[#FDF8F0]">
      <div className="max-w-3xl mx-auto space-y-12">
        <SectionTitle subtitle="Informações Importantes" title="Termos & FAQ Reis SPA" />
        <div className="space-y-4">{faqs.map((faq, index) => <FaqItem key={index} question={faq.question} answer={faq.answer} />)}</div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="py-24 px-6 bg-white text-[#C5A059]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <SectionTitle subtitle="Agendamentos" title="Inicie sua Jornada" />
          <p className="text-[#C5A059]/70 text-lg font-light leading-relaxed font-sans">No coração de <strong>Ilhabela</strong>, ofereço um refúgio de silêncio e cuidado. Reserve seu momento de luxo e bem-estar hoje mesmo.</p>
          <div className="space-y-4">
            <a href="https://wa.me/5512982000105" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 font-medium group"><span className="w-12 h-12 bg-[#C5A059]/5 rounded-full flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white transition-all text-[#C5A059]">→</span>WhatsApp Agendamento</a>
            <div className="flex items-center gap-4 font-medium"><span className="w-12 h-12 bg-[#C5A059]/5 rounded-full flex items-center justify-center text-[#C5A059]">📍</span>Ilhabela, São Paulo</div>
            <a href="https://www.instagram.com/terapiasdereis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 font-medium group text-[#C5A059]"><span className="w-12 h-12 bg-[#C5A059]/5 rounded-full flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white transition-all">📸</span>Siga no Instagram</a>
          </div>
        </div>
        <div className="bg-[#C5A059] p-12 rounded-[3rem] text-[#FDF8F0] space-y-6 shadow-xl">
          <h3 className="text-2xl font-serif font-bold italic">Horário de Atendimento</h3>
          <div className="space-y-2 opacity-90 font-light font-sans">
            <p className="flex justify-between border-b border-[#FDF8F0]/10 pb-2"><span>Segunda - Sexta</span> <span>08h - 20h</span></p>
            <p className="flex justify-between border-b border-[#FDF8F0]/10 pb-2"><span>Sábado</span> <span>09h - 14h</span></p>
            <p className="flex justify-between"><span>Domingo</span> <span>Sob Consulta</span></p>
          </div>
          <p className="text-sm italic opacity-60 pt-4">*Atendimentos prioritários sob consulta.</p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // ATIVANDO O EFEITO PARA FORÇAR O TÍTULO NA ABA DO NAVEGADOR
  useEffect(() => {
    document.title = "Reis SPA | Onde o toque se torna intenção";
  }, []);

  return (
    <main className="min-h-screen selection:bg-[#C5A059] selection:text-[#FDF8F0] font-sans scroll-smooth">
      <Hero />
      <About />
      <Services />
      <PregnancyCare />
      <TestimonialCarousel />
      <Addons />
      <GiftVoucher />
      <Guidelines />
      <Faq />
      <Contact />
      <footer className="py-12 bg-[#FDF8F0] text-center border-t border-[#C5A059]/10 space-y-3">
        <p className="text-[#C5A059]/50 text-xs font-bold tracking-[0.2em] uppercase">Reis SPA • Ilhabela, SP • © 2026</p>
        <p className="text-[#C5A059]/70 text-sm font-light tracking-wide">
          Desenvolvido com carinho por{' '}
          <a 
            href="https://github.com/laborqueky" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-80 border-b border-[#C5A059]/40 pb-0.5 transition-all font-semibold text-[#C5A059]"
          >
            Rebeca Gonçalves
          </a>
        </p>
      </footer>
        
    </main>
  );
}