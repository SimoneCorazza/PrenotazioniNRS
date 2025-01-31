import React, { useMemo } from 'react';
import Responsabili from './Responsabili';

interface AttivitaPros {
    responsabiliChiusura: string[];
    responsabiliApertura: string[];
}

const SvgApertura = (<svg fill="#000000" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
<g>
   <g>
       <g>
           <path d="M477.261,190.805H367.065l-79.761-79.76c-1.951-15.542-15.241-27.609-31.304-27.609
               c-16.064,0-29.353,12.066-31.305,27.609l-79.761,79.76H34.739C15.584,190.805,0,206.389,0,225.544v168.28
               c0,19.156,15.584,34.739,34.739,34.739h442.523c19.156,0,34.739-15.584,34.739-34.739v-168.28
               C512,206.389,496.416,190.805,477.261,190.805z M256.001,101.283c7.562,0,13.715,6.152,13.715,13.715
               c0,7.562-6.152,13.715-13.715,13.715c-7.563,0-13.715-6.152-13.715-13.715C242.284,107.435,248.438,101.283,256.001,101.283z
                M229.255,131.724c5.587,8.9,15.484,14.835,26.746,14.835c11.262,0,21.159-5.933,26.745-14.835l59.082,59.081H170.172
               L229.255,131.724z M494.154,393.824c0,9.315-7.578,16.893-16.893,16.893H34.739c-9.315,0-16.893-7.578-16.893-16.893v-168.28
               c0-9.315,7.578-16.893,16.893-16.893h442.523c9.315,0,16.893,7.578,16.893,16.893V393.824z"/>
           <path d="M136.247,258.454h-8.656c-16.33,0-29.616,13.286-29.616,29.616V331.3c0,16.33,13.286,29.616,29.616,29.616h8.656
               c16.33,0,29.616-13.286,29.616-29.616v-43.231C165.862,271.739,152.576,258.454,136.247,258.454z M148.016,331.299
               c0,6.49-5.28,11.77-11.77,11.77h-8.656c-6.49,0-11.77-5.28-11.77-11.77v-43.231c0-6.49,5.28-11.77,11.77-11.77h8.656
               c6.49,0,11.77,5.28,11.77,11.77V331.299z"/>
           <path d="M225.225,258.454h-35.606c-4.928,0-8.923,3.995-8.923,8.923v84.615c0,4.928,3.995,8.923,8.923,8.923
               s8.923-3.995,8.923-8.923v-28.381h26.683c12.88,0,23.359-10.479,23.359-23.358v-18.441
               C248.583,268.932,238.105,258.454,225.225,258.454z M230.737,300.253c0,3.04-2.473,5.512-5.513,5.512h-26.683v-29.466h26.683
               c3.04,0,5.513,2.473,5.513,5.513V300.253z"/>
           <path d="M405.102,258.454c-4.928,0-8.923,3.995-8.923,8.923v51.999l-33.438-56.54c-2.046-3.461-6.154-5.125-10.035-4.065
               c-3.878,1.061-6.568,4.585-6.568,8.606v84.615c0,4.928,3.995,8.923,8.923,8.923s8.923-3.995,8.923-8.923v-51.999l33.438,56.54
               c1.635,2.764,4.583,4.382,7.68,4.382c0.782,0,1.573-0.102,2.354-0.316c3.878-1.061,6.568-4.585,6.568-8.606v-84.615
               C414.025,262.449,410.031,258.454,405.102,258.454z"/>
           <path d="M322.381,276.299c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923h-50.042c-4.928,0-8.923,3.995-8.923,8.923
               v84.615c0,4.928,3.995,8.923,8.923,8.923h50.042c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923h-41.119v-23.552
               h16.098c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923h-16.098v-25.372H322.381z"/>
       </g>
   </g>
</g>
</svg>);

const SvgChiusura = (<svg fill="#000000" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512">
<g>
   <g>
       <g>
           <path d="M477.261,190.805H367.065l-79.761-79.76c-1.951-15.542-15.241-27.609-31.305-27.609s-29.353,12.066-31.304,27.609
               l-79.761,79.76H34.739C15.584,190.805,0,206.389,0,225.544v168.28c0,19.156,15.584,34.739,34.739,34.739h442.523
               c19.156,0,34.739-15.584,34.739-34.739v-168.28C512,206.389,496.416,190.805,477.261,190.805z M255.999,101.283
               c7.563,0,13.715,6.152,13.715,13.715c0,7.562-6.152,13.715-13.715,13.715c-7.562,0-13.715-6.152-13.715-13.715
               C242.284,107.435,248.438,101.283,255.999,101.283z M229.255,131.724c5.587,8.9,15.483,14.835,26.745,14.835
               c11.262,0,21.159-5.933,26.746-14.835l59.082,59.081H170.172L229.255,131.724z M494.154,393.824
               c0,9.315-7.578,16.893-16.893,16.893H34.739c-9.315,0-16.893-7.578-16.893-16.893v-168.28c0-9.315,7.578-16.893,16.893-16.893
               h442.523c9.315,0,16.893,7.578,16.893,16.893V393.824z"/>
           <path d="M87.576,276.299h20.933c3.105,0,5.631,2.526,5.631,5.631c0,4.928,3.995,8.923,8.923,8.923s8.923-3.995,8.923-8.923
               c0-12.945-10.531-23.477-23.477-23.477H87.576c-12.945,0-23.477,10.531-23.477,23.477v55.507
               c0,12.945,10.531,23.477,23.477,23.477h20.933c12.945,0,23.477-10.531,23.477-23.477c0-4.928-3.995-8.923-8.923-8.923
               s-8.923,3.995-8.923,8.923c0,3.105-2.526,5.631-5.631,5.631H87.576c-3.105,0-5.631-2.526-5.631-5.631V281.93
               C81.945,278.825,84.471,276.299,87.576,276.299z"/>
           <path d="M260.328,258.454h-8.656c-16.33,0-29.616,13.286-29.616,29.616V331.3c0,16.33,13.286,29.616,29.616,29.616h8.656
               c16.33,0,29.616-13.286,29.616-29.616v-43.231C289.943,271.739,276.658,258.454,260.328,258.454z M272.097,331.299
               c0,6.49-5.28,11.77-11.77,11.77h-8.656c-6.49,0-11.77-5.28-11.77-11.77v-43.231c0-6.49,5.28-11.77,11.77-11.77h8.656
               c6.49,0,11.77,5.28,11.77,11.77V331.299z"/>
           <path d="M343.532,258.454h-12.419c-16.583,0-30.076,13.493-30.076,30.077c0,16.583,13.493,30.076,30.076,30.076h7.733
               c6.743,0,12.23,5.487,12.23,12.232c0,6.743-5.487,12.23-12.23,12.23h-12.419c-4.16,0-7.544-3.385-7.544-7.545v-2.732
               c0-4.928-3.995-8.923-8.923-8.923s-8.923,3.995-8.923,8.923v2.732c0,14.001,11.39,25.391,25.39,25.391h12.419
               c16.583,0,30.076-13.493,30.076-30.076c0-16.585-13.493-30.077-30.076-30.077h-7.733c-6.743,0-12.23-5.487-12.23-12.23
               c0-6.745,5.487-12.231,12.23-12.231h12.419c4.16,0,7.544,3.385,7.544,7.545v2.509c0,4.928,3.995,8.923,8.923,8.923
               c4.928,0,8.923-3.995,8.923-8.923v-2.509C368.921,269.844,357.532,258.454,343.532,258.454z"/>
           <path d="M202.042,328.652c-4.928,0-8.923,3.995-8.923,8.923v5.494h-32.195v-75.692c0-4.928-3.995-8.923-8.923-8.923
               s-8.923,3.995-8.923,8.923v84.615c0,4.928,3.995,8.923,8.923,8.923h50.041c4.928,0,8.923-3.995,8.923-8.923v-14.417
               C210.965,332.647,206.97,328.652,202.042,328.652z"/>
           <path d="M438.978,276.299c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923h-50.041c-4.928,0-8.923,3.995-8.923,8.923
               v84.615c0,4.928,3.995,8.923,8.923,8.923h50.041c4.928,0,8.923-3.995,8.923-8.923s-3.995-8.923-8.923-8.923H397.86v-24.462
               h16.097c4.928,0,8.923-3.995,8.923-8.923c0-4.928-3.995-8.923-8.923-8.923H397.86v-24.462H438.978z"/>
       </g>
   </g>
</g>
</svg>);

const Attivita: React.FC<AttivitaPros> = ({responsabiliApertura, responsabiliChiusura}) => {

    return (
        <div className='attivita'>
            <div className='attivita-icona'>{SvgApertura}</div>
            <Responsabili responsabili={responsabiliApertura} limite={3} />
            <div className='attivita-icona'>{SvgChiusura}</div>
            <Responsabili responsabili={responsabiliChiusura} limite={3} />
        </div>
    );
};

export default Attivita;