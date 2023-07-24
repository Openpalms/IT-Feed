import React, { Suspense } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginModal.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { LoginForm } from '../LoginForm/LoginForm.lazy'
import { Loader } from 'shared/ui/Loader/Loader'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
  return (
    <Modal className={classNames(cls.LoginModal, {}, [className])} isOpen={isOpen} onClose={onClose} lazy>
      <Suspense fallback={<Loader />}>
        <LoginForm />
      </Suspense>
    </Modal>
  )
}
