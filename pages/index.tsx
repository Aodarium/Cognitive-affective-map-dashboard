import type { NextPage } from "next";
import {
	createStyles,
	Image,
	Container,
	Title,
	Button,
	Group,
	Text,
	List,
	ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import image from "./image.svg";

const useStyles = createStyles((theme) => ({
	inner: {
		display: "flex",
		justifyContent: "space-between",
		paddingTop: theme.spacing.xl * 4,
		paddingBottom: theme.spacing.xl * 4,
	},

	content: {
		maxWidth: 480,
		marginRight: theme.spacing.xl * 3,
		[theme.fn.smallerThan("md")]: { maxWidth: "100%", marginRight: 0 },
	},

	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 44,
		lineHeight: 1.2,
		fontWeight: 900,
		[theme.fn.smallerThan("xs")]: { fontSize: 28 },
	},

	control: { [theme.fn.smallerThan("xs")]: { flex: 1 } },
	image: { flex: 1, [theme.fn.smallerThan("md")]: { display: "none" } },

	highlight: {
		position: "relative",
		borderRadius: theme.radius.sm,
		padding: "4px 12px",
	},
}));

const Home: NextPage = () => {
	const { classes } = useStyles();
	return (
		<div>
			<Container>
				<div className={classes.inner}>
					<div className={classes.contentNextImage}>
						<Title className={classes.title}>
							<span className={classes.highlight}>
								Cognitive Affective Map tools
							</span>{" "}
							to easily create and integrate CAM studies into online
							experiments.
						</Title>
						<Text color="dimmed" mt="md">
							Build fully functional accessible Cognitive Affective Map
							experiments faster than ever!
						</Text>
					</div>
					<Image src={image.src} className={classes.image} />
				</div>
				<div className={classes.inner}>
					<div className={classes.contentBelowImage}>
						<List
							mt={30}
							spacing="sm"
							size="sm"
							icon={
								<ThemeIcon size={20} radius="xl">
									<IconCheck size={12} stroke={1.5} />
								</ThemeIcon>
							}
							className={classes.listItems}
						>
							<List.Item>
								<b>Online based</b> – all our tools are running online so no
								need to setup any server (although you could)
							</List.Item>
							<List.Item>
								<b>Free and open source</b> – all packages have MIT license, you
								can use the CAM tools in any project, just don't forget to quote
								us
							</List.Item>
							<List.Item>
								<b>Tested systematically</b> – all the different tools provided
								were tested to ensure best data quality
							</List.Item>
						</List>

						<Group mt={30}>
							<a key="More information" href="/information" target="_self">
								<Button radius="xl" size="md" className={classes.control}>
									More information
								</Button>
							</a>
							<a
								key="Source code"
								href="https://github.com/Camel-app?tab=repositories"
								target="_blank"
							>
								<Button
									variant="default"
									radius="xl"
									size="md"
									className={classes.control}
								>
									Source code
								</Button>
							</a>
						</Group>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Home;
