import React from 'react'
import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { IProfile } from '../../model/types/profile'
import { Loader } from 'shared/ui/Loader/Loader'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Currency, CurrencySelect } from 'app/entities/Currency'
import { Country, CountrySelect } from 'app/entities/Country'

interface ProfileCardProps {
  className?: string
  data?: IProfile
  error?: string
  isLoading?: boolean
  readonly?: boolean
  onChangeFirstname?: (value: string) => void
  onChangeLastname?: (value: string) => void
  onChangeUsername?: (value: string) => void
  onChangeAvatar?: (value: string) => void
  onChangeCity?: (value: string) => void
  onChangeAge?: (value: string) => void
  onChangeCurrency?: (value: Currency) => void
  onChangeCountry?: (value: Country) => void
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  className,
  data,
  error,
  isLoading,
  onChangeFirstname,
  onChangeLastname,
  onChangeUsername,
  onChangeAvatar,
  onChangeAge,
  onChangeCity,
  onChangeCurrency,
  onChangeCountry,
  readonly = false,
}) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
        <Loader />
      </div>
    )
  }
  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text title='Some error occured' text='try again' theme={TextTheme.ERROR} align={TextAlign.CENTER} />
      </div>
    )
  }
  const mods: Mods = {
    [cls.editing]: !readonly,
  }
  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar source={data.avatar} size={100} />
          </div>
        )}
        <Input
          value={data?.username}
          onChange={onChangeUsername}
          placeholder='Your username'
          className={cls.input}
          readonly={readonly}
        />
        <Input
          value={data?.firstname}
          onChange={onChangeFirstname}
          placeholder='Your name'
          className={cls.input}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          onChange={onChangeLastname}
          placeholder='Your last name'
          className={cls.input}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          onChange={onChangeAvatar}
          placeholder='Link to your avatar'
          className={cls.input}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          onChange={onChangeAge}
          placeholder='Your age'
          className={cls.input}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          onChange={onChangeCity}
          placeholder='Your city'
          className={cls.input}
          readonly={readonly}
        />
        <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
        <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
      </div>
    </div>
  )
}
