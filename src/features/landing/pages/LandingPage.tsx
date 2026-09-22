import { Link } from "react-router-dom";
import { 
  Printer, 
  Ruler,
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Sparkles,
  ChevronRight,
  HelpCircle,
  
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans selection:bg-blue-500 selection:text-white">
      
      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-22" alt="" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#precos" className="hover:text-white transition-colors">Planos</a>
            <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Entrar
            </Link>
            <a
              href="#testar"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition-all active:scale-95"
            >
              Testar Grátis
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400 mb-8 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Sistema Inteligente para Impressões DTF</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Receba arquivos, <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">calcule metros</span> e atenda clientes no piloto automático.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Elimine orçamentos demorados no WhatsApp e arquivos enviados fora do gabarito. Ofereça um portal próprio onde seu cliente envia os arquivos e calcula o valor da impressão na hora.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#testar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition-all active:scale-95"
            >
              <span>Começar Agora Gratuitamente</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#como-funciona"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-7 py-3.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              Ver Como Funciona
            </a>
          </div>

          {/* Preview do App */}
          <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/50 p-2 sm:p-4 shadow-2xl shadow-blue-900/10 backdrop-blur-xl">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-6 sm:p-8 text-left space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-slate-500 font-mono">portal.suaestamparia.com.br</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">Arquivo Enviado</span>
                  <p className="text-sm font-semibold text-white mt-1 truncate">estampas_gangsheet_58cm.pdf</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">Metragem Calculada</span>
                  <p className="text-sm font-semibold text-blue-400 mt-1">12.50 metros lineares</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">Total do Orçamento</span>
                  <p className="text-sm font-semibold text-emerald-400 mt-1">R$ 625,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Funcionalidades */}
      <section id="recursos" className="py-20 border-t border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Recursos Especializados
            </h2>
            <p className="text-3xl font-bold text-white mt-2">
              Feito sob medida para o fluxo de impressão DTF
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-slate-700 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-6">
                <Ruler className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cálculo Automático de Metros</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                O cliente envia o arquivo e o sistema detecta a altura exata do layout em metros, multiplicando pelo valor da sua tabela de preços.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-slate-700 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-6">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Portal Com A Sua Marca</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Seu cliente acessa uma área exclusiva com a sua logo, cores e dados de contato, fortalecendo a credibilidade do seu negócio.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-slate-700 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-6">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gestão Financeira e Faturas</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Acompanhe pagamentos pendentes, históricos de consumo por cliente e faturas geradas de forma simples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Como Funciona */}
      <section id="como-funciona" className="py-20 bg-slate-900/30 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Fluxo Descomplicado
            </h2>
            <p className="text-3xl font-bold text-white mt-2">
              Como o sistema funciona na prática
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative text-center p-6 border border-slate-800/80 rounded-2xl bg-slate-950">
              <span className="text-5xl font-black text-slate-800 block mb-4">01</span>
              <h3 className="text-lg font-semibold text-white mb-2">Envio do Arquivo</h3>
              <p className="text-sm text-slate-400">O cliente acessa o link da sua empresa e envia o arquivo montado (PDF, TIFF ou PNG).</p>
            </div>

            <div className="relative text-center p-6 border border-slate-800/80 rounded-2xl bg-slate-950">
              <span className="text-5xl font-black text-slate-800 block mb-4">02</span>
              <h3 className="text-lg font-semibold text-white mb-2">Orçamento Instantâneo</h3>
              <p className="text-sm text-slate-400">O sistema lê as dimensões, calcula os metros lineares e exibe o valor total para aprovação.</p>
            </div>

            <div className="relative text-center p-6 border border-slate-800/80 rounded-2xl bg-slate-950">
              <span className="text-5xl font-black text-slate-800 block mb-4">03</span>
              <h3 className="text-lg font-semibold text-white mb-2">Fila de Impressão</h3>
              <p className="text-sm text-slate-400">O pedido aparece organizado no seu painel com o arquivo pronto para enviar à RIP.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabela de Planos */}
      <section id="precos" className="py-20 border-t border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Preços Transparentes
            </h2>
            <p className="text-3xl font-bold text-white mt-2">
              Planos que se adaptam ao tamanho do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Iniciante */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Plano Starter</h3>
                <p className="text-sm text-slate-400 mt-1">Ideal para estamparias iniciantes ou de pequeno porte.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">R$ 97</span>
                  <span className="text-slate-400 text-sm ml-2">/mês</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>Até 100 pedidos/mês</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>Cálculo automático de metragem</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>Portal do cliente customizado</span>
                  </li>
                </ul>
              </div>
              <a
                href="#testar"
                className="mt-8 block w-full text-center rounded-xl border border-slate-700 bg-slate-800 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Escolher Starter
              </a>
            </div>

            {/* Plano Pro */}
            <div className="rounded-2xl border-2 border-blue-600 bg-slate-900/80 p-8 flex flex-col justify-between relative shadow-xl shadow-blue-900/20">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white uppercase tracking-wider">
                Mais Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Plano Pro</h3>
                <p className="text-sm text-slate-400 mt-1">Para quem tem alta demanda e precisa de escala.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">R$ 197</span>
                  <span className="text-slate-400 text-sm ml-2">/mês</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    <span>Pedidos ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    <span>Domínio personalizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    <span>Suporte prioritário via WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    <span>Gestão financeira completa</span>
                  </li>
                </ul>
              </div>
              <a
                href="#testar"
                className="mt-8 block w-full text-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all"
              >
                Testar Pro Grátis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className="py-20 border-t border-slate-900 bg-slate-900/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Dúvidas Frequentes
            </h2>
            <p className="text-3xl font-bold text-white mt-2">
              Perguntas e Respostas
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
                Como funciona o cálculo automático de metros?
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Quando o cliente faz o envio do arquivo PDF ou TIFF, nosso servidor analisa os metadados do documento para identificar a altura exata do arquivo e multiplica pelo preço por metro configurado na sua conta.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
                Meu cliente precisa criar uma conta para enviar o arquivo?
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Sim, o cadastro é simplificado (apenas CPF/CNPJ, e-mail e senha) para garantir que todos os pedidos fiquem atrelados ao histórico correto do cliente.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
                Posso testar antes de assinar?
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Com certeza! Oferecemos um período de teste gratuito para você configurar sua loja e receber seus primeiros pedidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Final */}
      <section id="testar" className="py-20 border-t border-slate-900 bg-gradient-to-b from-slate-950 to-blue-950/40">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pronto para otimizar suas impressões DTF?
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Economize tempo no atendimento e reduza erros na produção. Crie sua conta em poucos segundos.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition-all active:scale-95"
            >
              <span>Criar Minha Conta Grátis</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-slate-900 py-8 bg-slate-950 text-xs text-slate-500 text-center">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-22" alt="" />
          </div>
          
          <p>© {new Date().getFullYear()} DTFGo. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}