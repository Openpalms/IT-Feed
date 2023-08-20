import React, { useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AddCommentForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getNewCommentError, getNewCommentText } from 'features/AddNewComment/model/selectors/addCommentSelector'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { newCommentActions, newCommentReducer } from 'features/AddNewComment/model/slices/addNewCommentSlice'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}
const reducers: ReducersList = {
  AddCommentForm: newCommentReducer,
}
const AddCommentForm: React.FC<AddCommentFormProps> = ({ className, onSendComment }) => {
  const text = useSelector(getNewCommentText)
  const error = useSelector(getNewCommentError)
  const dispatch = useAppDispatch()

  const onTextChange = useCallback(
    (value: string) => {
      dispatch(newCommentActions.setText(value))
    },
    [dispatch],
  )

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onTextChange('')
  }, [onTextChange, text, onSendComment])

  return (
    <DynamicModuleLoader shouldDestroy={true} reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input placeholder='Enter your comment here' value={text} onChange={onTextChange} className={cls.input} />
        <Button theme={ThemeButton.OUTLINE} onClick={onSendHandler}>
          Send comment
        </Button>
      </div>
    </DynamicModuleLoader>
  )
}

export default AddCommentForm
