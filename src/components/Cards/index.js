import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import './index.css'
import { useState } from 'react'

function Cards({ persons, handleDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState(null)

  const openConfirmation = (id) => {
    setTaskIdToDelete(id)
    setShowConfirmation(true)
  }

  const closeConfirmation = () => {
    setTaskIdToDelete(null)
    setShowConfirmation(false)
  }

  const urlBase = 'http://localhost:3001/images/'

  const confirmDelete = () => {
    if (taskIdToDelete !== null) {
      handleDelete(taskIdToDelete)
      closeConfirmation()
    }
  }

  if (persons.length === 0) {
    return (
      <div>
        <p>Não existem dados a serem exibidos!</p>
      </div>
    )
  }

  return (
    <div className='row mb-2'>
      {persons.map((person) => (
        <div className='col-sm-4 my-2' key={person.id}>
          <div className='card m-2 d-flex flex-column h-100'>
            <img
              src={urlBase + person.foto}
              className='card-img-top'
              alt='foto'
              style={{ objectFit: 'cover', height: '200px' }} // Definindo um tamanho para a imagem
            />
            <div className='card-body'>
              <h5 className='card-title'>{person.nome}</h5>
              <p className='card-text address'>
                <i className='bi bi-geo-alt'></i> {person.endereco}
              </p>
              <p className='card-text'>
                <i className='bi bi-phone'></i>{' '}
                <a href={`tel:${person.numero}`}>{person.numero}</a>
              </p>
              <p className='card-text'>
                <i className='bi bi-envelope'></i>{' '}
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </p>
              <p className='card-text'>
                <i className='bi bi-calendar'></i>{' '}
                {format(new Date(person.data_nascimento), 'dd/MM/yyyy', {
                  locale: ptBR,
                })}
              </p>
            </div>
            <div className='card-footer text-muted'>
              <Link to={`/${person.id}`} className='btn btn-success'>
                <i className='bi bi-pencil'></i> Editar
              </Link>
              <button
                className='btn btn-danger mx-2'
                onClick={() => openConfirmation(person.id)}
              >
                <i className='bi bi-trash3'></i> Excluir
              </button>
            </div>
          </div>
        </div>
      ))}

      {showConfirmation && (
        <div className='modal'>
          <div className='modal-content'>
            <h4>Realmente deseja excluir?</h4>
            <button onClick={confirmDelete}>Sim</button>
            <button onClick={closeConfirmation}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards
