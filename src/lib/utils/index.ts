import 'reflect-metadata'
import { Container } from "typedi"
import { IoC } from "../framework/ioc"

export const ioc = Container.get(IoC)
