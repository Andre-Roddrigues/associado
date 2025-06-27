import React from 'react'
import PacotesItem from './PacotesItem'
import { ToolTip } from '../Cursos/tooltip'

export function Basico() {
  return (
    <div className="flex flex-col justify-center pt-2 gap-3 py-4 text-sm lg:text-base">
      <PacotesItem>Vídeo aulas</PacotesItem>
      <PacotesItem>Acesso vitalício</PacotesItem>
      <PacotesItem>⁠Aulas na plataforma dedicada </PacotesItem>
      <PacotesItem>Suporte pelo WhatsApp durante o período do curso</PacotesItem>
      <PacotesItem>
        Certificado
        <div className="inline-block ml-2 align-middle">
          <ToolTip  />
        </div>
      </PacotesItem>
    </div>
  )
}
export function Intermediario() {
  return (
    <div className="flex flex-col justify-cente -pt-10 gap-3 py-4 text-sm lg:text-base">
      <PacotesItem >Vídeo aulas</PacotesItem>
      <PacotesItem >Fichas de apoio</PacotesItem>
      <PacotesItem>Acesso vitalício</PacotesItem>
      <PacotesItem>⁠Aulas na plataforma dedicada </PacotesItem>
      <PacotesItem>Suporte pelo WhatsApp durante o período do curso</PacotesItem>
      <PacotesItem >Avaliações e trabalhos</PacotesItem>
      <PacotesItem>
        Certificado
        <div className="inline-block ml-2 align-middle">
          <ToolTip />
        </div>
      </PacotesItem>
    </div>
  )
}
export function Interactivo() {
  return (
    <div className=" h-full flex flex-col justify-center pt-5 gap-3 py-4 text-sm lg:text-base">
      <PacotesItem >Vídeo aulas</PacotesItem>
      <PacotesItem >Fichas de apoio</PacotesItem>
      <PacotesItem>Acesso vitalício</PacotesItem>
      <PacotesItem>⁠Aulas na plataforma dedicada </PacotesItem>
      <PacotesItem>Suporte pelo WhatsApp durante o período do curso</PacotesItem>
      <PacotesItem >Avaliações e trabalhos</PacotesItem>
      <PacotesItem >Aulas de interação directa com o formador</PacotesItem>
      <PacotesItem >Certificado grátis</PacotesItem>

    </div>
  )
}
