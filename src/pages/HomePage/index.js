
import { Header } from '../../components/Header'
import styles from './index.module.css'
import { Label } from '../../components/Label'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export const HomePage = () => {

    return <>
        <Header title={"Ordinal Inscription Lookup"} />
        <div className={styles.pageContainer}>
        <Label>Home Page</Label>
        <Input></Input>
        <Button>Look up</Button>
        </div>
    </>
}
