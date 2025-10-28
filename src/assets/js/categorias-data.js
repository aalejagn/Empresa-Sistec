// Base de datos de libros
const librosData = {
    'mas-vendidos': [
        {
            titulo: 'Sus ojos miraban a Dios',
            autor: 'Zora Neale Hurston',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/61_KbxrnHxL.jpg?v=1736152142&width=990',
            descripcion: 'Una de las obras más importantes de la literatura estadounidense del siglo XX, el amado clásico de 1937 de Zora Neale Hurston, Their Eyes Were Watching God, es una historia de amor sureña perdurable que brilla con ingenio, belleza y sabiduría sincera.',
            publicado: '2006-01-03',
            editorial: 'Harper Perennial',
            encuadernacion: 'Rústica',
            precio: '$17.99 USD'
        },
        {
            titulo: 'Olive, Again: Una novela',
            autor: 'Elizabeth Strout',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51SOYJGewiL_61e1065d-0464-49d0-bdf0-dfa5138de3b2.jpg?v=1736151644&width=990',
            descripcion: 'Espinosa, irónica, resistente al cambio pero despiadadamente honesta y profundamente empática, Olive Kitteridge es "una fuerza vital convincente" (San Francisco Chronicle).',
            publicado: '2020-11-03',
            editorial: 'Random House Trade Paperbacks',
            encuadernacion: 'Rústica',
            precio: '$18.00 USD'
        },
        {
            titulo: 'La bailarina del agua: una novela',
            autor: 'Ta-Nehisi Coates',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51gSloBtq0L.jpg?v=1736148004&width=990',
            descripcion: '"Este potente libro sobre el pecado más vergonzoso de Estados Unidos establece [a Ta-Nehisi Coates] como un novelista de primer orden". --San Francisco Chronicle',
            publicado: '2020-11-17',
            editorial: 'One World',
            encuadernacion: 'Rústica',
            precio: '$19.00 USD'
        },
        {
            titulo: 'Nimona',
            autor: 'Noelle Stevenson',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51boHj8x7vL_fc22898b-f15b-454c-90cd-628053e43afb.jpg?v=1736145118&width=990',
            descripcion: 'Nimona es una joven cambiaformas impulsiva con una habilidad especial para la villanía. Lord Ballister Blackheart es un villano con una venganza.',
            publicado: '2015-05-12',
            editorial: 'Quill Tree Books',
            encuadernacion: 'Rústica',
            precio: '$18.99 USD'
        },
        {
            titulo: 'El diario de una niña',
            autor: 'Ana Frank',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51DvoRaqkvL.jpg?v=1741801884&width=990',
            descripcion: 'El diario de una niña de Ana Frank se encuentra entre los documentos más perdurables del siglo XX. Sigue siendo un testimonio amado y profundamente admirado de la naturaleza indestructible del espíritu humano.',
            publicado: '1997-02-03',
            editorial: 'Bantam',
            encuadernacion: 'Libro de bolsillo',
            precio: '$8.99 USD'
        }
    ],
    'literatura-contemporanea': [
        {
            titulo: '¡Yo!',
            autor: 'Julia Alvarez',
            imagen: 'https://tse1.mm.bing.net/th/id/OIP.RrGvlYUT4Ur97-m8XTk1vAHaLJ?rs=1&pid=ImgDetMain&o=7&rm=3',
            descripcion: 'La odisea estadounidense de Yo, una escritora dominicana cuya familia llegó a los Estados Unidos como refugiados de una dictadura. La novela sigue su juventud, con su energía y optimismo, y los contratiempos a medida que envejece, incluidos dos divorcios.',
            publicado: '1997-12-01',
            encuadernacion: 'Rústica',
            precio: '$6.95 USD'
        },
        {
            titulo: 'Olive, Again: Una novela',
            autor: 'Elizabeth Strout',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51SOYJGewiL_61e1065d-0464-49d0-bdf0-dfa5138de3b2.jpg?v=1736151644&width=990',
            descripcion: 'Espinosa, irónica, resistente al cambio pero despiadadamente honesta y profundamente empática, Olive Kitteridge es "una fuerza vital convincente" (San Francisco Chronicle). Olive lucha por comprenderse no solo a sí misma y a su propia vida, sino también a las vidas de quienes la rodean en la ciudad de Crosby, Maine.',
            publicado: '2020-11-03',
            editorial: 'Random House Trade Paperbacks',
            encuadernacion: 'Rústica',
            precio: '$18.00 USD'
        },
        {
            titulo: 'Sus ojos miraban a Dios',
            autor: 'Zora Neale Hurston',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/61_KbxrnHxL.jpg?v=1736152142&width=990',
            descripcion: 'Una de las obras más importantes de la literatura estadounidense del siglo XX, el amado clásico de 1937 de Zora Neale Hurston, Their Eyes Were Watching God, es una historia de amor sureña perdurable que brilla con ingenio, belleza y sabiduría sincera.',
            publicado: '2006-01-03',
            editorial: 'Harper Perennial',
            encuadernacion: 'Rústica',
            edicion: 'Reedición',
            precio: '$17.99 USD'
        },
        {
            titulo: 'Sus ojos miraban a Dios (Edición Tapa Dura)',
            autor: 'Zora Neale Hurston',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/61OCtY5hROL.jpg?v=1739382917&width=990',
            descripcion: '"Una novela profundamente conmovedora que comprende el amor y la crueldad, y separa a las personas grandes de los pequeños de corazón, sin perder nunca la simpatía por aquellos desafortunados que no saben cómo vivir adecuadamente".',
            publicado: '2021-01-05',
            editorial: 'Amistad Press',
            encuadernacion: 'Tapa dura',
            precio: '$27.99 USD'
        }
    ],
    'literatura-historica': [
        {
            titulo: 'Viaje a casa',
            autor: 'Yoshiko Uchida',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51udpdbi6mL.jpg?v=1745604319&width=990',
            descripcion: 'Después de su liberación de un campo de concentración estadounidense, una niña japonesa-estadounidense y su familia intentan reconstruir sus vidas en medio de fuertes sentimientos antijaponeses que generan miedo, desconfianza y violencia.',
            publicado: '1992-10-31',
            editorial: 'Aladdin',
            encuadernacion: 'Rústica',
            edicion: '2ª ed.',
            precio: '$6.95 USD'
        },
        {
            titulo: 'La pulsera',
            autor: 'Yoshiko Uchida',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/61dIeezfklL.jpg?v=1747331162&width=990',
            descripcion: 'Yoshiko Uchida se basa en su propia infancia como japonesa-estadounidense durante la Segunda Guerra Mundial en un campo de internamiento para contar la conmovedora historia del descubrimiento del poder de la memoria por parte de una niña.',
            publicado: '1996-11-12',
            editorial: 'Puffin Books',
            encuadernacion: 'Rústica',
            edicion: 'Ilustrada',
            precio: '$6.95 USD'
        },
        {
            titulo: 'Corazón de un samurái',
            autor: 'Margi Preus',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51p8_eYSKNL.jpg?v=1758852689&width=990',
            descripcion: 'En 1841 se hunde un barco pesquero japonés. Su tripulación se ve obligada a nadar hasta una isla pequeña y desconocida, donde son rescatados por un barco estadounidense. Manjiro, un niño de 14 años, es curioso y está ansioso por aprender todo lo que pueda sobre esta nueva cultura.',
            publicado: '2012-02-01',
            editorial: 'Harry N. Abrams',
            encuadernacion: 'Rústica',
            edicion: 'Ilustrada',
            precio: '$6.95 USD'
        },
        {
            titulo: 'En el tiempo de las mariposas',
            autor: 'Julia Alvarez',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/4151OPXYASL.jpg?v=1736152383&width=990',
            descripcion: 'Es el 25 de noviembre de 1960 y tres hermosas hermanas han sido encontradas cerca de su Jeep destrozado. Las hermanas estuvieran entre los principales opositores a la dictadura del general Rafael Leonidas Trujillo. Todo el mundo conoce Las Mariposas, "Las mariposas".',
            editorial: 'Algonquin Books',
            edicion: 'Reimpresión',
            precio: '$18.99 USD'
        },
        {
            titulo: 'El diario de una niña',
            autor: 'Ana Frank',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51DvoRaqkvL.jpg?v=1741801884&width=990',
            descripcion: 'El diario de una niña de Ana Frank se encuentra entre los documentos más perdurables del siglo XX. Desde su publicación en 1947, ha sido leído por decenas de millones de personas en todo el mundo. Sigue siendo un testimonio amado y profundamente admirado de la naturaleza indestructible del espíritu humano.',
            publicado: '1997-02-03',
            editorial: 'Bantam',
            encuadernacion: 'Libro de bolsillo para el mercado masivo',
            edicion: 'Ilustrada',
            precio: '$8.99 USD'
        }
    ],
    'ficcion-afroamericana': [
        {
            titulo: 'La bailarina del agua: una novela',
            autor: 'Ta-Nehisi Coates',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51gSloBtq0L.jpg?v=1736148004&width=990',
            descripcion: '"Este potente libro sobre el pecado más vergonzoso de Estados Unidos establece [a Ta-Nehisi Coates] como un novelista de primer nivel". --San Francisco Chronicle',
            publicado: '2020-11-17',
            editorial: 'One World',
            encuadernacion: 'Rústica',
            precio: '$19.00 USD'
        },
        {
            titulo: 'Los chicos del níquel: una novela',
            autor: 'Colson Whitehead',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/41f9FbE7RYL.jpg?v=1736172990&width=990',
            descripcion: 'Basada en la historia real de un reformatorio que funcionó durante 111 años y deformó la vida de miles de niños, The Nickel Boys es una narrativa devastadora e impulsada que muestra a un gran novelista estadounidense escribiendo en el apogeo de sus poderes.',
            publicado: '2019-07-16',
            editorial: 'Doubleday',
            encuadernacion: 'Tapa dura',
            edicion: '1ª Edición',
            precio: '$27.00 USD'
        },
        {
            titulo: 'Ve a contarlo en la montaña',
            autor: 'James Baldwin',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51xa_SWoPkL.jpg?v=1736151083&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro para capacitar a los jóvenes para que se hagan cargo de sus vidas.',
            publicado: '2013-09-12',
            editorial: 'Vintage',
            encuadernacion: 'Rústica',
            edicion: 'Reimpresión',
            precio: '$16.00 USD'
        }
    ],
    'novelas-graficas': [
        {
            titulo: 'Nimona',
            autor: 'Noelle Stevenson',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51boHj8x7vL_fc22898b-f15b-454c-90cd-628053e43afb.jpg?v=1736145118&width=990',
            descripcion: 'Nimona es una joven cambiaformas impulsiva con una habilidad especial para la villanía. Lord Ballister Blackheart es un villano con una venganza. Como compañera y supervillana, Nimona y Lord Blackheart están a punto de causar estragos.',
            publicado: '2015-05-12',
            editorial: 'Quill Tree Books',
            encuadernacion: 'Rústica',
            edicion: 'Ilustrada',
            precio: '$18.99 USD'
        },
        {
            titulo: 'Ley de clase',
            autor: 'Jerry Craft',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51MhBD8WuYL.jpg?v=1736149263&width=990',
            descripcion: 'Drew Ellis, estudiante de octavo grado, no es ajeno al dicho "Tienes que trabajar el doble para ser igual de bueno". Su abuela se lo ha recordado toda su vida. Pero, ¿qué pasa si trabaja diez veces más duro y aún no tiene las mismas oportunidades que sus privilegiados compañeros de clase?',
            publicado: '2020-10-06',
            editorial: 'Quill Tree Books',
            encuadernacion: 'Rústica',
            edicion: 'Ilustrada',
            precio: '$15.99 USD'
        },
        {
            titulo: 'Cabezas de calabaza',
            autor: 'Rainbow Rowell',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/519OHqOUISL.jpg?v=1750355120&width=990',
            descripcion: 'Josiah está listo para pasar toda la noche sintiéndose melancólico por eso. Deja no está listo para dejarlo. Ella tiene un plan: ¿Qué pasaría si, en lugar de deprimirse y arrojar frijoles de lima en la cabaña de Succotash, salieran con una explosión?',
            publicado: '2019-08-27',
            editorial: 'First Second',
            encuadernacion: 'Rústica',
            edicion: 'Ilustrada',
            precio: '$18.99 USD'
        }
    ],
    'ficcion-internacional': [
        {
            titulo: 'Antes de que el café se enfríe: una novela',
            autor: 'Toshikazu Kawaguchi',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/4174AJ-RtVL.jpg?v=1747058448&width=990',
            descripcion: 'En un pequeño callejón de Tokio, hay una cafetería que ha estado sirviendo café cuidadosamente preparado durante más de cien años. La leyenda local dice que esta tienda ofrece algo más que café: la oportunidad de viajar en el tiempo.',
            publicado: '2020-11-17',
            editorial: 'Hanover Square Press',
            encuadernacion: 'Tapa dura',
            edicion: 'Original',
            precio: '$19.99 USD'
        },
        {
            titulo: 'Crimen y castigo',
            autor: 'Fiódor Dostoievski',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51X8dkqlDdL.jpg?v=1754762058&width=990',
            descripcion: 'Durante más de sesenta y cinco años, Penguin ha sido la editorial líder de literatura clásica en el mundo de habla inglesa. Con más de 1.500 títulos, Penguin Classics representa una estantería global de las mejores obras a lo largo de la historia.',
            publicado: '2015-07-14',
            editorial: 'Penguin',
            edicion: 'Deluxe',
            precio: '$22.00 USD'
        }
    ],
    'ciencia-ficcion': [
        {
            titulo: 'Semilla silvestre',
            autor: 'Octavia E. Butler',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51YYB09ZfYL.jpg?v=1740535456&width=990',
            descripcion: 'Doro no conoce una autoridad superior a él mismo. Un espíritu antiguo con poderes ilimitados, posee humanos, matando sin remordimiento mientras salta de cuerpo en cuerpo para mantener su propia vida. Con una eternidad solitaria por delante, Doro cría humanos sobrenaturalmente dotados.',
            publicado: '2020-03-17',
            editorial: 'Grand Central Publishing',
            encuadernacion: 'Rústica',
            edicion: 'Reedición',
            precio: '$18.99 USD'
        },
        {
            titulo: 'Érase una vez un corazón roto',
            autor: 'Stephanie Garber',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/41oq-e-5gGL_a6b7c230-097d-442a-bb1b-403edbb9e713.jpg?v=1736159980&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro para capacitar a los jóvenes para que se hagan cargo de sus vidas.',
            publicado: '28/03/2023',
            encuadernacion: 'Rústica',
            precio: '$12.99 USD'
        },
        {
            titulo: 'El ojo de la novia Bedlam',
            autor: 'Matt Dinniman',
            imagen: 'https://tse3.mm.bing.net/th/id/OIP.RdinnXWmOPYszqniVak_qgHaL2?rs=1&pid=ImgDetMain&o=7&rm=3',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro para capacitar a los jóvenes para que se hagan cargo de sus vidas.',
            publicado: '2025-05-13',
            editorial: 'Ace',
            precio: '$39.00 USD'
        },
        {
            titulo: 'Bestias y Behemoths',
            autor: 'Andrew Stacey Wheeler',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51CXoj62-bL_b800d0ac-6639-48ec-970f-aa72ac2c0ae6.jpg?v=1736149331&width=990',
            descripcion: 'Esta guía ilustrada transporta a los nuevos jugadores al mundo mágico de Dungeons & Dragons y presenta un curso único en su tipo sobre las criaturas inusuales, desde las minúsculas hasta las masivas, que llenan el mundo fantástico del juego.',
            publicado: '2020-10-20',
            editorial: 'Ten Speed Press',
            encuadernacion: 'Tapa dura',
            edicion: 'Ilustrada',
            precio: '$12.99 USD'
        }
    ],
    'infantiles-juveniles': [
        {
            titulo: 'Cómo atrapar un Yeti',
            autor: 'Adam Wallace',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51zrujY2oaL.jpg?v=1751492717&width=990',
            descripcion: 'Cuando nuestros brillantes niños del Catch Club se enteran del legendario Yeti, se dirigen a las montañas para echar un vistazo y demostrar que realmente existe. Lleno de divertidas travesuras y trampas inteligentes.',
            publicado: '2020-09-01',
            editorial: 'Sourcebooks Wonderland',
            encuadernacion: 'Tapa dura',
            edicion: 'Ilustrada',
            precio: '$10.99 USD'
        },
        {
            titulo: '¿Dónde está Waldo ahora?',
            autor: 'Martin Handford',
            imagen: 'https://tse4.mm.bing.net/th/id/OIP.JdrHftfGVPEmW5GPomTjkgHaJJ?rs=1&pid=ImgDetMain&o=7&rm=3',
            descripcion: 'Waldo y sus amigos Wenda, Woof, Wizard Whitebeard y Odlaw están apareciendo en escenas a lo largo de la historia, apareciendo junto a hombres de las cavernas, gladiadores, mineros de oro y más. ¡Waldo incluso se pierde en el futuro!',
            publicado: '2019-12-24',
            editorial: 'Candlewick',
            encuadernacion: 'Rústica',
            edicion: 'Ilustrada',
            precio: '$8.99 USD'
        },
        {
            titulo: 'Libro de cartón del oso Paddington',
            autor: 'Michael Bond',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/510y2mnH18L.jpg?v=1753753907&width=990',
            descripcion: 'Paddington Bear ha encantado a los lectores durante generaciones. Escrito en rima simple para los fanáticos más jóvenes, y combinado con el arte animado de R. W. Alley, este libro de cartón es una gran introducción a Paddington.',
            publicado: '2014-07-22',
            editorial: 'HarperFestival',
            encuadernacion: 'Libro de cartón',
            precio: '$9.99 USD'
        },
        {
            titulo: 'La granja que nos alimenta',
            autor: 'Nancy Castaldo',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51axNIZMc_L.jpg?v=1751896402&width=990',
            descripcion: 'Explore el funcionamiento de una granja familiar orgánica a pequeña escala y experimente el ritmo de la vida agrícola. En la primavera, visite el gallinero, labre los campos y recorra la maquinaria agrícola.',
            publicado: '2020-07-21',
            editorial: 'Palabras e Imágenes',
            encuadernacion: 'Tapa dura',
            edicion: 'Ilustrada',
            precio: '$19.95 USD'
        },
        {
            titulo: 'El árbol ocupado',
            autor: 'Jennifer Ward',
            imagen: 'https://m.media-amazon.com/images/I/A1rWUtKoEnL._SL1500_.jpg',
            descripcion: 'Espectaculares ilustraciones realizadas en pintura al óleo y un texto que rima que describe las actividades de un árbol desde sus raíces hasta sus ramas, presentan a los jóvenes lectores las increíbles actividades que se realizan en un árbol.',
            publicado: '2009-09-01',
            editorial: 'Dos Leones',
            encuadernacion: 'Tapa dura',
            edicion: 'Ilustrada',
            precio: '$17.99 USD'
        },
        {
            titulo: 'Tiempo de limpieza',
            autor: 'Elizabeth Verdick',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/5154rw_KsKL.jpg?v=1751478741&width=990',
            descripcion: 'Los niños pequeños esperarán con ansias la hora de limpiar con este sencillo libro de rimas que los anima a cantar mientras ordenan. Los niños pequeños aprenden a trabajar juntos para poner artículos en su lugar.',
            publicado: '2008-08-10',
            editorial: 'Free Spirit Publishing',
            encuadernacion: 'Libro de cartón',
            precio: '$9.99 USD'
        },
        {
            titulo: '¡Oh, los pensamientos que puedes pensar!',
            autor: 'Dr. Seuss',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51fclNUlpDL.jpg?v=1742277136&width=990',
            descripcion: 'Originalmente creados por el Dr. Seuss, los libros para principiantes alientan a los niños a leer por sí mismos, con palabras simples e ilustraciones que dan pistas sobre su significado.',
            publicado: '2009-08-11',
            editorial: 'Random House Books for Young Readers',
            encuadernacion: 'Libro de cartón',
            edicion: 'Ilustrada',
            precio: '$5.99 USD'
        },
        {
            titulo: 'Bella el hada conejita',
            autor: 'Daisy Meadows',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51bLrd-UAZL.jpg?v=1742248525&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro.',
            publicado: '2024-05-14',
            editorial: 'Silver Dolphin Books',
            precio: '$5.99 USD'
        }
    ],
    'no-ficcion': [
        {
            titulo: 'Potencial oculto',
            autor: 'Adam Grant',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/41yQYmGoutL.jpg?v=1744408410&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro para capacitar a los jóvenes para que se hagan cargo de sus vidas.',
            publicado: '2023-10-24',
            encuadernacion: 'Tapa dura',
            precio: '$32.00 USD'
        },
        {
            titulo: 'El Proyecto 1619',
            autor: 'Sin especificar',
            imagen: 'https://images.justwatch.com/poster/306354628/s718/temporada-1.jpg',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro.',
            publicado: '2021-11-16',
            encuadernacion: 'Tapa dura',
            precio: '$38.00 USD'
        },
        {
            titulo: 'Para hacer libres a los hombres',
            autor: 'Heather Cox Richardson',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/41Xc1WWb-tL.jpg?v=1736158279&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro.',
            publicado: '2021-11-23',
            encuadernacion: 'Rústica',
            precio: '$19.99 USD'
        },
        {
            titulo: 'Los estadounidenses indocumentados',
            autor: 'Karla Cornejo Villavicencio',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51C12KhLtOL.jpg?v=1741010211&width=990',
            descripcion: 'FINALISTA DEL PREMIO NACIONAL DEL LIBRO. Una de las primeras inmigrantes indocumentadas en graduarse de Harvard revela las vidas ocultas de sus compatriotas estadounidenses indocumentados.',
            publicado: '2021-04-06',
            encuadernacion: 'Rústica',
            edicion: 'Reimpresión',
            precio: '$20.00 USD'
        },
        {
            titulo: 'Espiando en el sur',
            autor: 'Tony Horwitz',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51kZEiFHxeL.jpg?v=1744639253&width=990',
            descripcion: 'Con Spying on the South, el autor más vendido de Confederates in the Attic regresa al sur y a la época de la Guerra Civil para una aventura épica tras la pista del mejor arquitecto paisajista de Estados Unidos.',
            publicado: '2020-05-12',
            editorial: 'Penguin Books',
            encuadernacion: 'Rústica',
            precio: '$19.00 USD'
        },
        {
            titulo: 'Más allá de las mentiras de COVID-19',
            autor: 'Bryan Ardis',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/41gNXEfdHaL.jpg?v=1750297883&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro.',
            publicado: '2024-10-01',
            editorial: 'Harvest Creek Publishing',
            edicion: '0',
            precio: '$24.99 USD'
        }
    ],
    'filosofia-religion': [
        {
            titulo: 'Meditaciones de Marco Aurelio',
            autor: 'Marco Aurelio',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/41iLX5vhBgL.jpg?v=1736166207&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro.',
            publicado: '2021-06-30',
            editorial: 'PETER PAUPER PRESS',
            precio: '$7.99 USD'
        },
        {
            titulo: 'NKJV, Biblia de alcance',
            autor: 'Thomas Nelson',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/31TyU3zJ9ZL.jpg?v=1736160261&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro.',
            publicado: '2017-06-06',
            editorial: 'Thomas Nelson',
            encuadernacion: 'Rústica',
            precio: '$19.99 USD'
        }
    ],
    'cine-artes': [
        {
            titulo: 'Notas sobre el cinematógrafo',
            autor: 'Robert Bresson',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51ml1LiKDCL.jpg?v=1749750558&width=990',
            descripcion: 'El director de cine francés Robert Bresson fue uno de los grandes artistas del siglo XX y uno de los estilistas más radicales, originales y radiantes de cualquier época. Trabajó con actores no profesionales, modelos, como él los llamaba.',
            publicado: '2016-11-15',
            editorial: 'NYRB Classics',
            encuadernacion: 'Rústica',
            edicion: 'Principal',
            precio: '$15.95 USD'
        },
        {
            titulo: 'Rebelde sin equipo',
            autor: 'Robert Rodríguez',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/512u6IAhfvL.jpg?v=1749664331&width=990',
            descripcion: 'Nadie ha aterrizado en el mapa cinematográfico con más fuerza explosiva que Robert Rodríguez, director de "El Mariachi". ¿Cómo se las arregló este cineasta aficionado de Texas para completar un largometraje por $7,000?',
            publicado: '1996-09-01',
            editorial: 'Plume',
            encuadernacion: 'Rústica',
            edicion: 'Ilustrada',
            precio: '$18.00 USD'
        }
    ],
    'misterio-thriller': [
        {
            titulo: 'Mata bien con otros',
            autor: 'Deanna Raybourn',
            imagen: 'https://shop.mtwyouth.org/cdn/shop/files/411S3xdv-tL.jpg?v=1741812754&width=990',
            descripcion: 'El doble resultado de More Than Words: cada compra brinda oportunidades prácticas de capacitación laboral y todos los ingresos apoyan a nuestra organización sin fines de lucro.',
            publicado: '2025-03-04',
            editorial: 'Berkley',
            precio: '$29.00 USD'
        }
    ]
};

// Títulos de categorías
const titulosCategorias = {
    'mas-vendidos': 'Más Vendidos',
    'literatura-contemporanea': 'Literatura Contemporánea',
    'literatura-historica': 'Literatura Histórica',
    'ficcion-afroamericana': 'Ficción Afroamericana',
    'novelas-graficas': 'Novelas Gráficas y Cómics',
    'ficcion-internacional': 'Ficción Literaria Internacional',
    'ciencia-ficcion': 'Ciencia Ficción y Fantasía',
    'infantiles-juveniles': 'Libros Infantiles y Juveniles',
    'no-ficcion': 'No Ficción y Desarrollo Personal',
    'filosofia-religion': 'Filosofía y Religión',
    'cine-artes': 'Cine y Artes',
    'misterio-thriller': 'Misterio y Thriller'
};

// Iconos para categorías
const iconosCategorias = {
    'mas-vendidos': 'fa-fire',
    'literatura-contemporanea': 'fa-book',
    'literatura-historica': 'fa-landmark',
    'ficcion-afroamericana': 'fa-book-reader',
    'novelas-graficas': 'fa-palette',
    'ficcion-internacional': 'fa-globe',
    'ciencia-ficcion': 'fa-rocket',
    'infantiles-juveniles': 'fa-child',
    'no-ficcion': 'fa-graduation-cap',
    'filosofia-religion': 'fa-om',
    'cine-artes': 'fa-film',
    'misterio-thriller': 'fa-mask'
};

// Función para crear una tarjeta de libro
function crearTarjetaLibro(libro) {
    return `
        <div class="libro-card-compacto">
            <div class="libro-header">
                <img src="${libro.imagen}" alt="${libro.titulo}" class="libro-imagen-compacta">
                <div class="libro-info-compacta">
                    <h3 class="libro-titulo-compacto">${libro.titulo}</h3>
                    <p class="libro-autor-compacto"><strong>Autor:</strong> ${libro.autor}</p>
                    <div class="libro-detalles-compactos">
                        ${libro.publicado ? `<p><i class="far fa-calendar"></i> ${libro.publicado}</p>` : ''}
                        ${libro.editorial ? `<p><i class="fas fa-building"></i> ${libro.editorial}</p>` : ''}
                        ${libro.encuadernacion ? `<p><i class="fas fa-book-open"></i> ${libro.encuadernacion}</p>` : ''}
                    </div>
                    <p class="libro-precio-compacto">${libro.precio}</p>
                </div>
                <i class="fas fa-chevron-down toggle-icon"></i>
            </div>
            <div class="libro-descripcion-expandible">
                <p class="libro-descripcion-texto">${libro.descripcion}</p>
            </div>
        </div>
    `;
}

// Función para cargar libros de una categoría
function cargarCategoria(categoria) {
    const contenedor = document.getElementById('libros-content');
    const libros = librosData[categoria] || [];
    
    let html = `
        <h2 class="categoria-titulo-actual">
            <i class="fas ${iconosCategorias[categoria]}"></i>
            ${titulosCategorias[categoria]}
        </h2>
    `;
    
    libros.forEach(libro => {
        html += crearTarjetaLibro(libro);
    });
    
    contenedor.innerHTML = html;
    
    // Agregar event listeners para toggle
    document.querySelectorAll('.libro-header').forEach(header => {
        header.addEventListener('click', function() {
            const card = this.parentElement;
            card.classList.toggle('active');
        });
    });
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listeners para categorías
document.addEventListener('DOMContentLoaded', function() {
    // Cargar categoría por defecto
    cargarCategoria('literatura-contemporanea');
    
    // Event listeners para items de categoría
    document.querySelectorAll('.categoria-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remover clase active de todos
            document.querySelectorAll('.categoria-item').forEach(i => i.classList.remove('active'));
            // Agregar clase active al seleccionado
            this.classList.add('active');
            // Cargar categoría
            const categoria = this.getAttribute('data-categoria');
            cargarCategoria(categoria);
        });
    });
    
    // Event listener para más vendidos
    document.querySelector('.bestseller-item').addEventListener('click', function() {
        // Remover clase active de categorías
        document.querySelectorAll('.categoria-item').forEach(i => i.classList.remove('active'));
        // Cargar más vendidos
        cargarCategoria('mas-vendidos');
    });
    
    // Prevenir scroll al hacer clic en enlaces del footer
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#footer') {
                e.preventDefault();
                document.querySelector('#footer').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});