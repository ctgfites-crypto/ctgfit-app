import { navegar } from './router.js'
import './legal.css'

function Volver({ estilo, children }) {
  return (
    <a className="back" style={estilo} href="/" onClick={(e) => { e.preventDefault(); navegar('/') }}>
      {children}
    </a>
  )
}

export default function Legal() {
  return (
    <div className="legal">
      <div className="wrap">
        <Volver>← Volver</Volver>
        <h1>Aviso legal y <span>privacidad</span></h1>
        <p className="updated">Última actualización: julio 2026</p>

        <div className="box">
          <h2 className="box-titulo">Aviso importante sobre salud</h2>
          <p>
            Toda la información publicada en CTG Fit —incluyendo artículos, vídeos, la calculadora
            de macros y cualquier guía o recurso— tiene <strong>fines exclusivamente educativos e
            informativos</strong>. No constituye consejo médico, nutricional ni de entrenamiento
            personalizado, y no sustituye la consulta con un médico, dietista-nutricionista u otro
            profesional sanitario titulado.
          </p>
          <p>
            Los resultados de la calculadora son <strong>estimaciones generales</strong> basadas en
            fórmulas estándar y pueden no ajustarse a tu situación individual. Antes de iniciar
            cualquier plan de alimentación, suplementación o ejercicio, consulta con un profesional
            cualificado, especialmente si tienes alguna condición médica, tomas medicación, estás
            embarazada o eres menor de edad.
          </p>
          <p>
            CTG Fit no se responsabiliza de decisiones tomadas a partir de esta información. El uso
            de los contenidos es bajo tu propia responsabilidad.
          </p>
        </div>

        <h2>Titular del sitio</h2>
        <p>
          Este sitio web es un proyecto personal gestionado por el titular de la marca CTG Fit.
          Para cualquier cuestión, puedes escribir a{' '}
          <a href="mailto:ctgfit.contacto@gmail.com">ctgfit.contacto@gmail.com</a>.
        </p>

        <h2>Propiedad intelectual</h2>
        <p>
          Los textos, diseños, logotipos y contenidos de este sitio son propiedad de CTG Fit salvo
          indicación contraria. No está permitida su reproducción total o parcial sin autorización.
        </p>

        <h2>Política de privacidad</h2>
        <p>
          Nos tomamos en serio la protección de tus datos conforme al Reglamento General de
          Protección de Datos (RGPD) y la LOPDGDD.
        </p>

        <h2>¿Qué datos recogemos?</h2>
        <ul>
          <li>
            <strong>Correo electrónico</strong>: únicamente si te suscribes voluntariamente a la
            lista de correo.
          </li>
          <li>
            <strong>Datos de la calculadora</strong> (peso, altura, edad, etc.): se procesan en tu
            navegador para el cálculo y <strong>no se almacenan en ningún servidor</strong> salvo
            que se indique lo contrario.
          </li>
          <li>
            <strong>Datos de navegación anónimos</strong>: podemos usar herramientas de analítica
            para entender cómo se usa el sitio.
          </li>
        </ul>

        <h2>¿Para qué usamos tu correo?</h2>
        <ul>
          <li>Enviarte contenido, consejos y novedades sobre CTG Fit.</li>
          <li>Avisarte del lanzamiento de guías y recursos.</li>
        </ul>
        <p>
          No vendemos ni cedemos tu correo a terceros. Puedes darte de baja en cualquier momento
          desde el enlace incluido en cada email.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar, suprimir y oponerte al tratamiento de tus datos.
          Para ejercerlos, escribe a{' '}
          <a href="mailto:ctgfit.contacto@gmail.com">ctgfit.contacto@gmail.com</a>.
        </p>

        <h2>Proveedores</h2>
        <p>
          Para el envío de correos utilizamos plataformas de email marketing que cumplen con el
          RGPD. El alojamiento del sitio corre a cargo de Vercel Inc.
        </p>

        <h2>Cookies</h2>
        <p>
          Este sitio puede usar cookies técnicas y de analítica. Al continuar navegando, aceptas su
          uso. Puedes configurar tu navegador para rechazarlas.
        </p>

        <Volver estilo={{ marginTop: 40 }}>← Volver al inicio</Volver>
      </div>
    </div>
  )
}
